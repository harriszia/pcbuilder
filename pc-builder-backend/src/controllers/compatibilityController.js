const pool = require('../config/db');

//////////////////////////////////////////////////////////////////
//////////compatiblityController NOT IMPLEMENTED YET//////////////


const checkCompatibility = async (req, res) => {
    const { selectedParts } = req.body; 
    try {
        // Fetch compatibility rules
        const rulesResult = await pool.query('SELECT * FROM CompatibilityRules');
        const rules = rulesResult.rows;

        // Initialize compatibility status
        let compatibilityStatus = {
            isCompatible: true,
            issues: [],
        };

        // Validate selected parts against the rules
        for (const rule of rules) {
            const part1 = selectedParts[rule.part_type_1];
            const part2 = selectedParts[rule.part_type_2];

            if (part1 && part2) {
                const isValid = validateRule(part1, part2, rule.rule);
                if (!isValid) {
                    compatibilityStatus.isCompatible = false;
                    compatibilityStatus.issues.push({
                        part1,
                        part2,
                        rule: rule.rule,
                    });
                }
            }
        }

        res.status(200).json(compatibilityStatus);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during compatibility check');
    }
};

// Helper function to validate a single rule
const validateRule = (part1, part2, rule) => {
    if (rule.includes('socket_type must match')) {
        return part1.socket_type === part2.socket_type;
    }
    return true; e
};

module.exports = { checkCompatibility };
