const toolsMetadata = require('../tools/tools_metadata.json');
function generateMetadata() {
    const snippet = [`const axios = require('axios');\n`];
    toolsMetadata.forEach(tool => {
        const functionName = tool.name;
        const inputParams = Object.keys(tool.input).map(key => key.split(' ')[0]);
        const paramsString = inputParams.join(', ');

        let functionCode = '';
        // Generate JavaScript function code
        const dataFields = inputParams.map(param => `        ${param}: ${param},`).join('\n');

        // Extract input and output descriptions for comments
        const inputComments = Object.entries(tool.input).map(([param, typeDesc]) => {
            const [type, ...descArray] = typeDesc.split(' ');
            const desc = descArray.join(' ');
            return ` * @param {${type}} ${param} - ${desc}`;
        }).join('\n');

        // Modify the outputComments generation
        const outputProperties = Object.entries(tool.output).map(([param, typeDesc]) => {
            const [type, ...descArray] = typeDesc.split(' ');
            const desc = descArray.join(' ');
            return ` *   @property {${type}} ${param} - ${desc}`;
        }).join('\n');

        const outputComments = ` * @returns {Object} - The result object.\n${outputProperties}`;

        // Add description to the JSDoc comment
        const description = `/**
* ${tool.description}
${inputComments}
${outputComments}
*/`;

        functionCode = `
${description}
async function ${functionName}(${paramsString}) {
    const url = 'http://localhost:3000/${functionName}';
    const data = {
${dataFields}
    };
    const response = await axios.post(url, data);
    return response.data;
}
`;
        snippet.push(`${functionCode}\n`);
    });
    return snippet.join('\n');
}

module.exports = generateMetadata;
