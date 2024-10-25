const axios = require('axios');


/**
* Calls the OpenAI API to generate a response based on the provided prompt.
 * @param {string} content - (optional, default: 'write a haiku about ai')
 * @returns {Object} - The result object.
 *   @property {string} message - 
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
 * @returns {Object} - The result object.
 *   @property {number} number - 
 *   @property {boolean} isMagical - 
 *   @property {string} message - 
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
    // Create a poem using numbers
    const poem = `
    1 2 3 4 5
    6 7 8 9 10
    11 12 13 14 15
    16 17 18 19 20
    `;

    // Extract numbers from the poem
    const numbers = poem.match(/\d+/g).map(Number);
    
    // Check which numbers are magical
    const magicalResults = await Promise.all(numbers.map(num => isMagical(num)));

    // Filter and display magical numbers
    const magicalNumbers = magicalResults.filter(result => result.isMagical).map(result => result.number);
    
    console.log("The following numbers are magical:", magicalNumbers);
}

main();
