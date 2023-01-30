// #!/usr/bin/env node

import inquirer from 'inquirer';
import chalk    from 'chalk';
import { Course, Teacher, Student } from './Segments/classes.js'
import { F_AddStudent, F_ViewStudents } from './Segments/student.js';
import { F_AddTeacher, F_ViewTeachers } from './Segments/Teachers.js';
import { F_AddCourse, F_ViewCourses }   from './Segments/Cources.js';

let g_students: Student[] = []
let g_courses : Course [] = []
let g_teachers: Teacher[] = []

const F_DetailsInputs = async (type: string, name: string) => {
    let value: string | number
    while (true) {

        const input = await inquirer.prompt([{
            name: 'input',
            message: `Enter ${name}: `,
            type: type

        }])
        value = await input['input']
        if (value) {
            break
        }
    }
    return value
}


async function F_IndividualChoice(val: string, ...options: string[]) {
    const input = await inquirer.prompt([{
        name: 'choice',
        message: `${val} Options`,
        type: 'rawlist',
        choices: options,
    }])
    let value: string = await input['choice']
    return value
}

async function F_MakeChoice() {
    const input = await inquirer.prompt([{
        name: 'schoperation',
        message: "Select One",
        type: 'rawlist',
        choices: ["Student", "Teacher", "Course"]
    }])
    
    let value: string = await input['schoperation']

    if (value === "Course") {
        const l_course = await F_IndividualChoice("Course", "Add Course", "Show Courses")
        if (l_course === "Add Course") {
            await F_AddCourse(F_DetailsInputs, g_courses)
        }
        if (l_course === "Show Courses") {
            await F_ViewCourses(g_courses, g_teachers, g_students)
        }
    }

    if (value === "Teacher") {
        const option = await F_IndividualChoice("Teacher", "Add Teacher", "Show Teachers")
        if (option === 'Add Teacher') {
            await F_AddTeacher(F_DetailsInputs, g_teachers)
        }
        if (option === 'Show Teachers') {
            await F_ViewTeachers(g_teachers, g_courses)
        }

    }

    if (value === "Student") {
        const option = await F_IndividualChoice("Student", "Add Student", "Show Students")
        if (option === "Add Student") {
            await F_AddStudent(F_DetailsInputs, g_students)
        }
        if (option === "Show Students") {
            await F_ViewStudents(g_students, g_courses)
        }
    }
}

while (true) {
    let choices = await F_MakeChoice()
    const value = await inquirer.prompt([
        {
            name: (`listExit`),
            message: (`Are you Sure! Do You Want To Exit?`),
            type: "confirm",
            default: false
        }
    ])
    
    let l_exit: boolean = value.listExit;
    if (l_exit) {
        break;
    }
    console.log('\n---------------------------------------------\n')
}
