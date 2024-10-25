a = `
Here's a JavaScript script that fulfills your request by generating a poem using numbers and then checking which of those numbers are magical. The \`main\` function serves as the entry point for this script.

\`\`\`javascript
const axios = require('axios');

/**
* Calls the OpenAI API to generate a response based on the provided prompt.
 * @param {string} content - (optional, default: 'write a haiku about ai')
 * @returns {string} - 
*/
async function agent(content) {
    const url = 'http://localhost:3000/agent';
    const data = {
        content: content,
    };
    const response = await axios.post(url, data);
    return response.data;
}

/**
* Determines whether a given number is Magical.
 * @param {number} number - (required)
 * @returns {number} - 
 * @returns {boolean} - 
 * @returns {string} - 
*/
async function isMagical(number) {
    const url = 'http://localhost:3000/isMagical';
    const data = {
        number: number,
    };
    const response = await axios.post(url, data);
    return response.data;
}

async function main() {
    // Generate a poem using numbers
    const poem = \`
        1 2 3
        4 5 6
        7 8 9
        10 11 12
    \`;
    
    console.log("Generated Poem:\n" + poem);

    // Extract numbers from the poem (assuming they are from 1 to 12 in this case)
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const magicalNumbers = [];

    // Check which numbers are magical
    for (const number of numbers) {
        const result = await isMagical(number);
        if (result.isMagical) { // Assuming response has a property 'isMagical'
            magicalNumbers.push(number);
        }
    }

    console.log("Magical Numbers: " + magicalNumbers.join(', '));
}

// Call the main function at the end of the file
main();
\`\`\`

### Explanation:
1. The \`main\` function generates a simple poem made up of numbers from 1 to 12 in a structured format.
2. It then calls \`isMagical\` for each number to determine if it is magical based on your service endpoint.
3. The results are collected and printed in the console. 

Please make sure that the endpoints \`http://localhost:3000/agent\` and \`http://localhost:3000/isMagical\` are operational for this script to work correctly.
`;


x = a.match(/(```(python|javascript|js))((\\n|\n|.)+?)(```)/m)
console.log(x[3])