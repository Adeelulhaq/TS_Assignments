// #!/usr/bin/env node
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
let l_CURR_CODE = [{ CurrencyCode: 'PKR', country: "Pakistani Rupee" },
    { CurrencyCode: 'SAR', country: "Saudi Riyal" },
    { CurrencyCode: 'AED', country: "Emirati Dirham" },
    { CurrencyCode: 'USD', country: "United States dollar" },
    { CurrencyCode: 'EUR', country: "Euro" }
];
let sleep = () => new Promise((r) => setTimeout(r, 1000));
async function F_spinner(p_msg_1, p_msg_2) {
    const spinner = createSpinner(p_msg_1).start();
    await sleep();
    spinner.success({ text: p_msg_2 });
}
async function f_enter_curr_code(p_messaage) {
    if (!l_CURR_CODE.length) {
        console.log("Their is no Currency list Available");
    }
    let v_curr = l_CURR_CODE.map((l_cur_code) => {
        return { name: l_cur_code.CurrencyCode, value: l_cur_code.CurrencyCode };
    });
    const input = await inquirer.prompt([
        {
            name: ('currlist'),
            type: "list",
            message: p_messaage,
            choices: v_curr
        }
    ]);
    return input.currlist;
}
async function f_enter_rate(p_msg) {
    const input = await inquirer.prompt([{ name: 'CUR_RATE',
            message: p_msg,
            type: 'NUNMBER',
        }
    ]);
    return input.CUR_RATE;
}
async function f_convert_currency_main(p_from_currency, p_base_curr_value, p_to_currency, p_rate) {
    let l_return = ('Base currency (' + p_from_currency + ') value is ' + p_base_curr_value + ' and your Required currency (' + p_to_currency + ')  Rate is ' + p_rate + ' and the conver value is ' + ((1 / p_rate) * p_base_curr_value));
    return l_return;
}
let convert = await f_convert_currency_main(await f_enter_curr_code('Select Currency Conversion from'), await f_enter_rate('Enter Currency Conversion Amount'), await f_enter_curr_code('Select Currency Conversion To'), await f_enter_rate('Enter Conversion Rate'));
console.log(convert);
