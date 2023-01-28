// #!/usr/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
async function welcome(l_heading) {
    const rainbowTitle = chalkAnimation.rainbow(l_heading + '\n');
    await sleep();
    rainbowTitle.stop();
}
await welcome("Calculator");
await welcome("Lets Start calculation....");
inquirer.prompt([{
        type: 'input',
        name: 'firstNumber',
        message: 'Enter the first number:'
    },
    {
        type: 'input',
        name: 'secondNumber',
        message: 'Enter the second number:'
    },
    {
        type: 'list',
        name: 'operator',
        message: 'Select an operator:',
        choices: ['+', '-', '*', '/']
    },
])
    .then(answers => {
    let result = 0;
    const firstNumber = parseFloat(answers.firstNumber);
    const secondNumber = parseFloat(answers.secondNumber);
    switch (answers.operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
    }
    console.log(`The result is: ${result}`);
});
