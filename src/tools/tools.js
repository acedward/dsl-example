const axios = require('axios'); 
const tools = {
    agent: async function(data) {
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        const prompt = data.content || "write a haiku about ai";

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'user', content: prompt }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                }
            });

            // Return only the assistant's reply
            return { message: response.data.choices[0].message.content };
        } catch (error) {
            console.error('Error calling OpenAI API:', error.response?.data || error.message);
            throw error;
        }
    },
    isMagical: function(data) {
        const number = data.number;

        // Validate the input
        if (typeof number !== 'number') {
            return { error: 'Please provide a numerical value in the "number" field.' };
        }

        // Determine if the number is odd or even
        const isEven = number % 2 === 0;

        // Return the result
        return {
            number: number,
            isMagical: isEven,
            message: `The number ${number} is ${isEven ? 'Magical!' : 'not Magical'}.`
        };
    },
    // Add other tool functions here
};

module.exports = { tools };
