// #!/usr/bin/env node

import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
//import { exit } from 'process';

interface to_do {   task_id    :  number 
                    Task       : string 
                    Task_Status: 'Complete'| 'Pending'|'Working' ;
                }

let l_to_do_list : to_do[] = [  { task_id: 1, Task: "create Presentation on DAO",Task_Status : 'Pending'},
                                { task_id: 2, Task: "Take class ",Task_Status : 'Pending'},
                                { task_id: 3, Task: "Complete Assignments",Task_Status : 'Pending'}
                             ];

//console.log(l_to_do_list[0])
let sleep = () => new Promise((r) => setTimeout(r, 1000)) ;

async function F_spinner(p_msg_1 : string , p_msg_2 : string ) 
{ const spinner = createSpinner(p_msg_1).start()
    await sleep()
  spinner.success({ text: p_msg_2 })
}

async function f_enter_task() {
    const input = await inquirer.prompt([{ name: 'Task',
                                           type: 'string',
                                         }
                           ])
    return input.Task;
}

async function  f_task_status () { 
     
     let input = await inquirer.prompt([
                                        { name: 'tskstatus',
                                           type: 'list',
                                            message: 'Select Task Status ',
                                            choices: [ { name: 'Complete',value: 'Complete' },
                                                        { name: 'Pending', value: 'Pending' },
                                                        { name: 'Working', value: 'Working' }
                                                    ]
                                        }
                                    ]);
    return (input.tskstatus); 
    };

async function F_add_new_task (p_task : string , p_task_id : number) 
{ 
    l_to_do_list.push({ task_id: p_task_id, Task : p_task ,Task_Status:'Pending' })
}

async function f_show_all_list ()  {
    if (!l_to_do_list.length) { console.log("Their is no TODO task Available")
                               }

     let todo = l_to_do_list.map((val) => {  return { name: val.Task + '  '+ val.Task_Status ,value: val.task_id   }
                                                   //{ name: val.Task, value: val.task_id }
                                          })
    const input = await inquirer.prompt([
        {
            name: ('alltodolist'),
            type: "list",
            message : 'Select To DO task for update',
            choices: todo
        }
    ])
    
     let p_task_id = input.alltodolist;

     let l_upd_del = await inquirer.prompt([
                                                {
                                                    name: 'upddel',
                                                    type: 'list',
                                                    message: 'Do you want to update or delete the Selected Task ',
                                                    choices: [ { name: 'Update', value: 'U' },
                                                                { name: 'Delete', value: 'D' }
                                                             ]
                                                }
                                           ]);
    
       if (l_upd_del.upddel == 'U') {await f_update_task(p_task_id,
                                                await f_task_status())}

        if (l_upd_del.upddel == 'D') {await f_delete_task(p_task_id)}
  }

  async function f_update_task (p_task_id : number,// p_task : string , 
                                p_task_status : 'Complete'| 'Pending'|'Working')  {
    
    let l_list  = l_to_do_list.find(f_list => f_list.task_id  === +p_task_id  )
    if (l_list) {  l_list.Task_Status = p_task_status  
                } 
   }

   
   async function f_delete_task (p_task_id : number)  {
        let l_list_indx  = l_to_do_list.findIndex(f_list => f_list.task_id  === +p_task_id  )
        // console.log(l_list_indx)
        if (l_list_indx !== -1) {
            l_to_do_list.splice(l_list_indx, 1);
                    } 
}

async function f_to_do_main() {
    while (true) {
        let l_to_do_option = await inquirer.prompt([
            {
                name: 'Todo_option',
                type: 'list',
                message: 'Select your Task list option:',
                choices: [
                    { name: 'Create New Task ', value: 'CN' },
                    { name: 'Show All Task', value: 'SA' },
                    { name: 'Exit', value: 'E' }
                ]
            }
        ]);


        if (l_to_do_option.Todo_option  === 'CN' ) {console.log('Create New To Do Task  ...: ')
                                                      F_add_new_task( await f_enter_task(), l_to_do_list.length+1)
                                                      F_spinner ('Creating New To DO  Task', 'Sucessfully created new Task');
                                                      console.log(l_to_do_list)
                                                    }
        else if (l_to_do_option.Todo_option  === 'SA' ) {console.log('Show All TO DO tasks  ...: ')
                                                          await  f_show_all_list();
                                                          console.log(l_to_do_list)
                                                        }           
        else if (l_to_do_option.Todo_option  === 'E' ) {console.log('Thank you for using our services ...: ')
                                                        await  F_spinner ('Exiting From TO DO App', 
                                                                          'Sucessfully Exit');
                                                        break;
                                                       }                                                    

          
                                            }
    }

 await f_to_do_main()