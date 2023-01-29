// #!/usr/bin/env node
import inquirer from 'inquirer';

interface IUser {   id: number;
                    pin: number;
                    balance: number;
                }

let users: IUser[] = [  { id: 1, pin: 1234, balance: 1000 },
                        { id: 2, pin: 5678, balance: 2000 },
                        { id: 3, pin: 9012, balance: 3000 }
                     ];

async function login() {
    let l_userId: number;
    let l_userPin: number;

    while (true) {
        
        let loginDetails = await inquirer.prompt([
                                                    {
                                                        name: 'userId',
                                                        type: 'input',
                                                        message: 'Enter your user id: '
                                                    },
                                                    {
                                                        name: 'userPin',
                                                        type: 'password',
                                                        message: 'Enter your pin: '
                                                    }
                                                ]);
      
        l_userId  = loginDetails.userId;
        l_userPin = loginDetails.userPin;        

        

        let user = users.find(f_user => f_user.id  === +l_userId &&  f_user.pin === +l_userPin );
        
         if (user) {
            return user;
        } else {
            console.log('Invalid user id or pin. Please try again.');
        }
    }
}

function f_caheck_balance (p_uid :number ) {
    let l_user_info = users.find(f_user => f_user.id  === +p_uid );
        
         if (l_user_info) {
            return l_user_info.balance;
        } else {
            console.log('User Balance Not Found');
        }
} 
// Deposit  Amount  
function f_deposit_amt (p_uid :number, p_withdraw_amount : number ) {
    let l_user_info = users.find(f_user => f_user.id  === +p_uid );
    
    if (l_user_info) {
            l_user_info.balance = l_user_info.balance + p_withdraw_amount;
                  
            return l_user_info.balance;
        } else {
            console.log('Unable to update your balance, please contact our help line ');
        }
} 

// Withdraw Amount  
function f_withdraw (p_uid :number, p_withdraw_amount : number ) {
    let l_user_info = users.find(f_user => f_user.id  === +p_uid );
    
    if (l_user_info) {
            l_user_info.balance = l_user_info.balance - p_withdraw_amount;
                  
            return l_user_info.balance;
        } else {
            console.log('Unable to update your balance, please contact our help line ');
        }
} 


// transaction amount 
async function f_tran_Amount() {
    const input = await inquirer.prompt([{
        name: 'Enter Amount',
        type: 'number',
    }])
    const value: number = await input['Enter Amount']
    return value
}

async function f_EXIT_FROM_ATM() {
    const input =  await inquirer.prompt([
                                            {type: "list",
                                            name: ('ExitfromATM'),
                                            message:"Would you like more transaction or You want to end your Transaction",
                                            choices: [ { name: 'Yes', value: 'Y' },
                                                        { name: 'No' , value: 'N' }
                                                        ]
                                            }
                                            ]); 
//const value  = await input.ExitfromATM;
return input.ExitfromATM;
}


async function atm_main() {
    let user = await login();
    console.log(`Welcome, ${user.id}`);


    while (true) {
        let l_transaction = await inquirer.prompt([
            {
                name: 'Trantype',
                type: 'list',
                message: 'Select transaction type:',
                choices: [
                    { name: 'Check balance', value: 'CB' },
                    { name: 'Withdraw', value: 'W' },
                    { name: 'Deposit', value: 'D' },
                    { name: 'Exit', value: 'E' }
                ]
            }
        ]);

           // Check balannnce 
        if (l_transaction.Trantype === 'CB' ) {console.log('Your Current Balance is  ...: ',f_caheck_balance(user.id))
                                                let l_exit = await f_EXIT_FROM_ATM();
                                                if (l_exit === 'N')  { console.log("Thank You for using Our ATM Services",
                                                                                                                    '/n',
                                                                                                                    'Your Current Balance is',
                                                                                                                    f_caheck_balance(user.id)) ;
                                                                                                                    break;
                                                                            }
                                              }
                                              
        // Exit from ATM Service
        else if (l_transaction.Trantype === 'E' ) {console.log("Thank You for using Our ATM Services",
                                                               '/n',
                                                               'Your Current Balance is',
                                                               f_caheck_balance(user.id)) ; 
                                                   break;
                                                }
        // Withdrawl services
        else if (l_transaction.Trantype === 'W' ) {  console.log('Your Current Balance is  ...: ',f_withdraw(user.id,await f_tran_Amount())) 
                                                     let l_exit = await f_EXIT_FROM_ATM();
                                                     if (l_exit === 'N')  { console.log("Thank You for using Our ATM Services",
                                                                                            '/n',
                                                                                            'Your Current Balance is',
                                                                                            f_caheck_balance(user.id)) ;
                                                                                 break;
                                                                                }
                                                   }
        // Deposit  services
        else if (l_transaction.Trantype === 'D' ) {console.log('Your Current Balance is  ...: ',f_deposit_amt(user.id,await f_tran_Amount()))
                                                    let l_exit = await f_EXIT_FROM_ATM();
                                                    if (l_exit === 'N')  { console.log("Thank You for using Our ATM Services",
                                                                                                                        '/n',
                                                                                                                        'Your Current Balance is',
                                                                                                                        f_caheck_balance(user.id)) ;
                                                                                                                        break;
                                                                                                                    }
                                                  }

    
    }
}

await atm_main()
