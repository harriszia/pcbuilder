const pool = require('../config/db');

// Fetch list of all parts in the 'parts' table
const getAllParts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM parts ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching parts:', error);
        res.status(500).send('Server error');
    }
};


// Fetch individual part by 'parts' row id
const getPartById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM parts WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Part not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch part' });
    }
};


// Add a new part to 'parts' table
const addPart = async (req, res) => {
    const { name, type, price, tier } = req.body;

    if (!name || !type || !price || !tier) {
        return res.status(400).json({ error: 'All fields (name, type, price, tier) are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO parts (name, type, price, tier) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, type, price, tier]
        );
        res.status(201).json(result.rows[0]); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add part' });
    }
};

// Delete a part by part id in 'parts' table
const deletePart = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM parts WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Part not found' });
        }

        res.status(200).json({ message: 'Part deleted successfully', part: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete part' });
    }
};

module.exports = { getAllParts, getPartById, addPart, deletePart };


