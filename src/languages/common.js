module.exports = { 
    header: (language) => `
=====================
* Create a script in ${language} that can use these tools to accomplish the required task.
* Your function main and unique entrypoint be called function main()
* These functions are available in the global namespace so they can be used from any task, but do not write or repeat them in the printed code - as it will cause an error.
* Call the main() at the end of file.
`,
footer: () => `=====================
` 
};
    