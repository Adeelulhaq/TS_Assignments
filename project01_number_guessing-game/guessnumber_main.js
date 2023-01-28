// #!/usr/bin/env node
import * as example from './guess_number.js';
import inquirer from 'inquirer';
await example.welcome("Number Guessing Game");
while (true) {
    let l_random_number = example.F_get_random_number(await example.F_deficulty_level());
    let l_user_number = await example.F_get_user_input();
    if (l_random_number === l_user_number) {
        console.log(("Congratulation You won the game."));
    }
    else if (l_random_number !== l_user_number) {
        console.log(("Better of luck Next Time"));
    }
    let l_play_again = await inquirer.prompt([
        { type: "list",
            name: ('Play_again'),
            message: "Do you want to play again",
            choices: [{ name: 'Yes', value: 'Y' },
                { name: 'No', value: 'N' }
            ]
        }
    ]);
    if (l_play_again.Play_again === 'N') {
        break;
    }
}
