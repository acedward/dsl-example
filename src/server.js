// Import Express and body-parser
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const {tools} = require('./tools/tools');
const common = require('./languages/common');
const javascript = require('./languages/javascript');
const python = require('./languages/python'); 
const engine = require('./engine');

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Set OPENAI_API_KEY');
}

const app = express();
app.use(bodyParser.json());

// Call the main LLM to generate the source code and execute.
app.post('/generate', async (req, res) => {
    const { language, prompt } = req.body;

    // Validate input
    if (!language || !prompt || !['javascript', 'python'].includes(language)) {
        return res.status(400).send('Invalid language or prompt');
    }

    try {
        const body = language === 'python' ? python() : javascript();
        const finalPrompt = `
${common.header(language)}
${body}
${common.footer()}
${prompt}
`;

        // Generate the program using OpenAI API
        const program = await engine(finalPrompt);
        const finalProgram = `${body}\n\n${program}`;

        // Save the generated program to a file
        const fileExtension = language === 'python' ? 'py' : 'js';
        const fileName = `generated_program.${fileExtension}`;
        fs.writeFileSync(fileName, '');
        fs.writeFileSync(fileName, finalProgram);

        // Run the generated program
        const command = language === 'python' ? `python ${fileName}` : `node ${fileName}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Execution error: ${error}`);
                return res.status(500).send('Error executing the generated program.');
            }
            
            // Log the output of the program
            console.log(`Program output:\n${stdout}`);

            // Send the output as the response
            res.send(stdout);
        });
    } catch (error) {
        console.error('Error generating code:', error);
        res.status(500).send('An error occurred while generating the code.');
    }
});

// Run the specific tool
app.post('/:toolName', async (req, res) => {
    const toolName = req.params.toolName;
    const data = req.body;
    if (typeof tools[toolName] === 'function') {
        try {
            const result = await tools[toolName](data);
            res.json(result);
        } catch (error) {
            res.status(500).send(`Error executing ${toolName}: ${error.message}`);
        }
    } else {
        res.status(404).send(`Tool ${toolName} not found`);
    }
});

// Start the server
app.listen(3000, () => {
    // console.log('Server is running on port 3000');
    console.log(`
    
In another terminal run either

./run-python.sh "Write a poem only using numbers and tell me which are magical"

or 

./run-javascript.sh "Write a poem only using numbers and tell me which are magical"

`)
});
