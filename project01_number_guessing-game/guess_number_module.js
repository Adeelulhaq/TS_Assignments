import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
export async function welcome(l_heading) {
    const rainbowTitle = chalkAnimation.rainbow(l_heading + '\n');
    await sleep();
    rainbowTitle.stop();
}
export let F_deficulty_level = async () => {
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)('Select Difficulty Level'),
            type: "list",
            choices: [
                { name: 'Easy', value: 'E' },
                { name: 'Medium', value: 'M' },
                { name: 'Difficult', value: 'D' }
            ]
        }
    ]);
    //let value = input;//await input['\x2B[38;2;255;255;160mSelect Difficulty Level\x2B[39m']
    return input;
};
export let F_get_random_number = (difficulty) => {
    let number = Math.ceil(Math.random() * (difficulty === 'E' ? 5 : difficulty === 'M' ? 10 : 15));
    return number;
};
export let F_get_user_input = async () => {
    const input = await inquirer.prompt([{ name: "EnterNUmber",
            type: "Input"
        }]);
    return input.EnterNUmber;
};
