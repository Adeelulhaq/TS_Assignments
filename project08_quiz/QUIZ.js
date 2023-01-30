// #!/usr/bin/env node
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
let g_total_answer;
let g_total_correct_answer = 0;
let l_quiz = [{ id: 1,
        Question: 'How Many provinces in pakistan',
        option: [{ o_id: 'A', o_opt: 'Two' },
            { o_id: 'B', o_opt: 'Three' },
            { o_id: 'C', o_opt: 'One' },
            { o_id: 'D', o_opt: 'Four' }],
        Answer: 'D' },
    { id: 2,
        Question: 'Who was the founder of pakistn',
        option: [{ o_id: 'A', o_opt: 'Qaid-e-Azam' },
            { o_id: 'B', o_opt: 'Allama Iqbal' },
            { o_id: 'C', o_opt: 'Ghandi Jee' },
            { o_id: 'D', o_opt: 'Nehroo Pandit' }],
        Answer: 'A' },
    { id: 3,
        Question: 'Karachi is Located near a Arabian Sea ',
        option: [{ o_id: 'A', o_opt: 'True' },
            { o_id: 'B', o_opt: 'False' }],
        Answer: 'A' }
    //      ,                     
    //  {       id: 4, 
    //    Question: 'How Many provinces in pakistan', 
    //      option: {A :'Two', B: 'Three', C : 'Six' , D :'Four'} ,
    //      Answer: 'Four' }, 
    //  {       id: 5, 
    //    Question: 'How Many provinces in pakistan', 
    //      option: {A :'Two', B: 'Three', C : 'Six' , D :'Four'} ,
    //      Answer: 'Four' },
    //  {       id: 6, 
    //    Question: 'How Many provinces in pakistan', 
    //      option: {A :'Two', B: 'Three', C : 'Six' , D :'Four'} ,
    //      Answer: 'Four' },                                                          
];
let sleep = () => new Promise((r) => setTimeout(r, 1000));
async function F_spinner(p_msg_1, p_msg_2) {
    const spinner = createSpinner(p_msg_1).start();
    await sleep();
    spinner.success({ text: p_msg_2 });
}
async function f_show_all_list(p_question, p_question_index) {
    if (!l_quiz[p_question_index].option.length) {
        console.log("Their is no Answer Available");
    }
    let l_quiz_list = l_quiz[p_question_index].option;
    let V_QUIZ = l_quiz_list.map((val) => {
        return { name: val.o_id + ') ' + val.o_opt,
            value: val.o_id };
        //{ name: val.Task, value: val.task_id }
    });
    let input = await inquirer.prompt([
        {
            name: ('V_QUIZ'),
            type: "list",
            message: p_question,
            choices: V_QUIZ
        }
    ]);
    return input.V_QUIZ;
}
async function f_Staart_quiz() {
    for (let i = 0; i < l_quiz.length; i++) {
        //let i = 2; 
        // console.log(`Question ${l_quiz[i].id}) `, l_quiz[i].Question);
        let l_reply = await f_show_all_list(`Question ${l_quiz[i].id}) ${l_quiz[i].Question}`, i);
        g_total_answer = i;
        if (l_reply === l_quiz[i].Answer) {
            g_total_correct_answer = g_total_correct_answer + 1;
        }
    }
    console.log(`Total Question... ${g_total_answer + 1}`);
    console.log(`Total Correct Answer... ${g_total_correct_answer}`);
    console.log(`Total Total Score is ... ${Math.floor((g_total_correct_answer * 100) / (g_total_answer + 1))}%   `);
}
f_Staart_quiz();
