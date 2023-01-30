// #!/usr/bin/env node
import inquirer from 'inquirer';
async function f_date() {
    const input = await inquirer.prompt([{ name: 'countdown',
            message: 'Enter count down End date (dd-mon-yyyy hh:mm:ss:)',
            type: 'date',
            default: '01-jan-2024 03:30:30'
        }
    ]);
    return input.countdown;
}
let l_date = (await f_date());
console.log(l_date);
const targetDate = new Date(l_date);
const countDown = setInterval(() => {
    const currentDate = new Date();
    const diff = targetDate.getTime() - currentDate.getTime();
    if (diff <= 0) {
        clearInterval(countDown);
        console.log("Time's up!");
    }
    else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`);
    }
}, 1000);
