const axios = require('axios');
const engine = async (prompt) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
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

        console.log(response.data.choices[0].message.content)
        // Return only the assistant's reply
        return response.data.choices[0].message.content.match(/(```(python|javascript|js))((\\n|\n|.)+?)(```)/m)[3];
    } catch (error) {
        console.error('Error calling OpenAI API:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = engine;