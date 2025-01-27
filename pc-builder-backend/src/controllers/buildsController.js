const pool = require('../config/db');
const { generateBuild } = require('../gptService');

// Fetch all builds in 'builds' table
const getBuilds = async (req, res) => {
   try {
       const result = await pool.query('SELECT * FROM Builds');
       res.status(200).json(result.rows);
   } catch (error) {
       console.error(error);
       res.status(500).send('Server error');
   }
};

// Fetch specific build by buildId from 'builds' table
const getBuild = async (req, res) => {
    const { id } = req.params;
    const buildId = parseInt(id, 10);
    if (isNaN(buildId)) {
        return res.status(400).json({error: "invalid build ID"});
    }
    //console.log("[[!]]Passed in req for getBuild(): ", req.params);
    //console.log("[[!]]Passed in buildId for getBuild(): ", buildId);
    try {
        // Query to fetch the build by buildId
        const result = await pool.query("SELECT * FROM builds WHERE id = $1", [buildId]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: "Build not found" }); 
        }

        res.status(200).json(result.rows[0]); // Return the found build

    } catch (error) {
        console.error("Error retrieving build:", error.message);
        res.status(500).json({ error: "An error occurred while retrieving the build" });    
    }

};

// Save a build to 'builds' table, pass generated build into function (returns buildId)
const createBuild = async (req, res) => {
    const { budget, use_case, build_details, total_price } = req;
    try {
        const query = `
            INSERT INTO builds (budget, use_case, build_details, total_price)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [budget, use_case, build_details, total_price];
        const result = await pool.query(query, values);
        //console.log("Returned SQL query", result.rows[0].id);
        return result.rows[0].id; // Returns the row id saved build
    } catch (error) {
        console.error('Error creating build:', error);
        res.status(500).send('Server error');
    }
};

// Handles the generation of pc build by passing 'parts' table into GPT function and saving generated build
const suggestBuild = async (req, res) => {
    const { budget, tier } = req.body;
    console.log("[[!]] Budget passed into suggestBuild: ", budget);
    console.log("[[!]] Performance tier passed into suggestBuild: ", tier);
    try {
        // Fetch parts list from the database 'parts' table
        const partsResult = await pool.query('SELECT * FROM parts ORDER BY type, price');

        if (partsResult.rowCount === 0) {
            return res.status(404).json({ error: 'No parts found' });
        }

        // Restructure and trim list of 'parts' rows into list of json objects
        const parts = partsResult.rows.map(part => ({
            id: part.id,
            name: part.name,
            type: part.type,
            price: parseFloat(part.price),
            tier: part.tier
        }));
        
        console.log("[[!]] Parts List: \n", parts);

        // Send to GPT to generate the build
        console.log("[[!]] Calling GPT");
        const gptResponse = await generateBuild(budget, tier, JSON.stringify(parts));

        // Save recieved generated data
        console.log("[[!]] gptResponse Recieved");
        const buildArray = JSON.parse(gptResponse);
        console.log("[[!]] Response Data Parsed:\n", buildArray);

        // Prepare build_details to save into createBuild()
        const consolidateBuildDetails = buildArray.reduce((acc, part) => {
            const {partId, price, ...rest} = part; //exclude partId and price
            return { ...acc, ...rest };
        }, {});

        // Calculate total price (nongeneratively)
        const totalPrice = buildArray.reduce((sum, part) => sum + part.price, 0);
        console.log("\n[[!]] Total Part price is ", totalPrice);
        
        // Assemble build object to send to createBuild()
        const saveBuild = {
            "budget": budget,
            "use_case": "gaming",
            "build_details": consolidateBuildDetails,
            "total_price": totalPrice
        }

        //console.log("[[!]] Sending saveBuild to createBuild()...\nsaveBuld: \n", saveBuild);
        const savedBuildId = await createBuild(saveBuild); // Save the id of the saved build
        
        console.log("[[!]] Saved Build ID: ", savedBuildId);
        res.status(201).json({ savedBuildId });
        console.log("........................................");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to suggest a build' });
    }
};


module.exports = { getBuilds, getBuild, createBuild, suggestBuild };
