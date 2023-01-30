// #!/usr/bin/env node
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
async function f_enter_paragraph() {
    const input = await inquirer.prompt([{ name: 'Para',
            message: 'Enter Your Paragraph',
            type: 'string',
        }
    ]);
    return input.Para;
}
let sleep = () => new Promise((r) => setTimeout(r, 3000));
async function F_spinner(p_msg_1, p_msg_2) {
    const spinner = createSpinner(p_msg_1).start();
    await sleep();
    spinner.success({ text: p_msg_2 });
}
async function countWords(paragraph) {
    let wordCount = 0;
    let charCount = 0;
    // Remove leading and trailing whitespaces
    paragraph = paragraph.trim();
    // Split the paragraph into words based on whitespaces
    let words = paragraph.split(/\s+/);
    wordCount = words.length;
    // Count the characters without whitespaces
    for (let word of words) {
        charCount += word.length;
    }
    await F_spinner('Process Your Paragraph ', 'Process Sucessfully Done Please see Below the result ');
    console.log('------------------Your Paragraph----------------------------');
    console.log(paragraph);
    console.log('------------------ Paragraph Summary  ----------------------------');
    console.log(`Number of words: ${wordCount}`);
    console.log(`Number of characters: ${charCount}`);
}
countWords(await f_enter_paragraph());
