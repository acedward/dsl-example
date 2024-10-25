const toolsMetadata = require('../tools/tools_metadata.json');
function generateMetadata() {
    const snippet = [`import requests\n`];
    toolsMetadata.forEach(tool => {
        const functionName = tool.name;
        const inputParams = Object.keys(tool.input).map(key => key.split(' ')[0]);
        const paramsString = inputParams.join(', ');

        let functionCode = '';


        // Generate Python function code
        const dataFields = inputParams.map(param => `        "${param}": ${param},`).join('\n');

        // Extract input and output descriptions for docstrings
        const inputComments = Object.entries(tool.input).map(([param, typeDesc]) => {
            const [type, ...descArray] = typeDesc.split(' ');
            const desc = descArray.join(' ');
            return `:param ${param}: ${desc}`;
        }).join('\n    ');
        const outputComments = Object.entries(tool.output).map(([param, typeDesc]) => {
            const [type, ...descArray] = typeDesc.split(' ');
            const desc = descArray.join(' ');
            return `:return ${param}: ${desc}`;
        }).join('\n    ');

        // Add description to the docstring
        const description = `"""
${tool.description}
${inputComments}
${outputComments}
"""`;

            functionCode = `
${description}
def ${functionName}(${paramsString}):
    url = 'http://localhost:3000/${functionName}'
    data = {
${dataFields}
    }
    response = requests.post(url, json=data)
    return response.json()
`;

        snippet.push(`${functionCode}\n`);
    });
    return snippet.join('\n');
}
module.exports = generateMetadata;