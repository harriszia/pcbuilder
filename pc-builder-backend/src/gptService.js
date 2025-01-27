const { OpenAI } = require('openai');

// Initialize OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use .env for storing API keys
});
console.log('[[!]] OpenAI initialized succesfully');

// Schema structure for desired GPT output
const selectedParts =
{
    "parts_list_schema": [
    {"partId": "integer", "CPU": "string", "price": "number"},
    {"partId": "integer", "CPUCooler": "string", "price": "number"},
    {"partId": "integer", "Motherboard": "string", "price": "number"},
    {"partId": "integer", "RAM": "string", "price": "number"},
    {"partId": "integer", "GPU": "string", "price": "number"},
    {"partId": "integer", "PSU": "string", "price": "number"},
    {"partId": "integer", "Case": "string", "price": "number"},
    {"partId": "integer", "Storage": "string", "price": "number"}
    ]
}

// Main directional prompt
const input_prompt = `You are a PC building assistant. You will be given a budget and a list of parts with prices in JSON. One PC build should have a CPU, GPU, MOBO (motherboard), and RAM (memory), PSU, Case, CPU Cooler, and Storage. Select the parts to build a PC within the budget provided. Prioritize GPU and CPU when adjusting for budget. Only use the parts provided in parts list.
\nYour entire response/output is going to consist of a single JSON array with list of objects {}, and you will NOT wrap it within JSON md markers. Output the build list as a list of JSON objects shown here:\n${JSON.stringify(selectedParts)}\n\nHere is the parts list:\n${JSON.stringify(selectedParts)}`

//console.log("[[!]] Inputted Prompt is : \n", input_prompt);


const generateBuild = async (budget, tier, parts) => {
    try {
        const input_params = `The budget is ${budget}, performance tier target is ${tier}, and parts list is: \n${parts}`;
        //console.log("[[!]] Raw Parameter Input: ", JSON.stringify(input_params));

        //GPT Generate build
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'developer',
                    content: input_prompt //input role definition and instructions prompt
                },
                {
                    role: 'user',
                    content: input_params //input passed data
                }
            ]//,
            //functions: [{name: "build_create", parameters: schema, required: ["budget" , "build_list", "total_price"] }],
            //function_call: {name: "build_create"}
        });

        // GPT output
        const result = response.choices[0].message.content; // Extract generated output
        //console.log("[[!]] Raw GPT Output: ", result);

        return result; // Return output back to suggestBuild() in buildsController

    } catch (error) {
        console.error('GPT API Error:', error.response?.data || error.message);
        throw new Error('Failed to generate a build');
    }
};

module.exports = { generateBuild };







//////////////////////////////////////////////////////////////////////////////////////////////
// UNUSED

const jsonOutput = {
    "budget": "number",
    "use_case":"gaming",
    "build_list":{
        "CPU":"string",
        "CPU Cooler": "string",
        "Motherboard":"string",
        "RAM":"string",
        "GPU": "string",
        "PSU": "string", 
        "Case": "string",
        "Storage": "string"
    },
    "total_price": "number"
}


const schema = {
    "type": "object",
    "properties": {
        "budget": {
            "type": "integer",
            "description": "Maximum budget of total price of all parts"
        },
        "build_list": {
            "type": "object",
            "properties": {
                "CPU": {
                    "type": "string",
                    "description": "Selected CPU from parts list to fit budget and performance tier"
                },
                "CPU Cooler": {
                    "type": "string",
                    "description": "Selected CPU Cooler from parts list to fit budget and performance tier"
                },
                "Motherboard": {
                    "type": "string",
                    "description": "Selected MOBO (motherboard) from parts list to fit budget and performance tier"
                },
                "RAM": {
                    "type": "string",
                    "description": "Selected RAM (memory) from parts list to fit budget and performance tier"
                },
                "GPU": {
                    "type": "string",
                    "description": "Selected GPU from parts list to fit budget and performance tier"
                },
                "PSU": {
                    "type": "string",
                    "description": "Selected PSU (powersupply) from parts list to fit budget and performance tier"
                },
                "Case": {
                    "type": "string",
                    "description": "Selected PC Case from parts list to fit budget and performance tier"
                },
                "Storage": {
                    "type": "string",
                    "description": "Selected Storage drive from parts list to fit budget and performance tier"
                }
            }
        },
        "total_price": {
            "type": "integer",
            "description": "Sum total of selected parts prices for the build."
        }
    }
    
}
