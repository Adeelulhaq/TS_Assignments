class Person {
                constructor(public name: string, public age: number) { }
             }
export class Course {
    name: string
    id: number = Math.floor(Math.random() * 892734)
    timing: string
    fee: number
    students: Student[] = []
    teacher!: Teacher
    constructor(name: string, timing: string, fee: number) {
                            this.name = name
                            this.timing = timing
                            this.fee = fee
                        }
    F_registerStudent(student: Student) {
        this.students.push(student)
    }
    F_addCourseInStudentCourses(student: Student) {
        student.F_registerInCourse(this)
    }
    F_setTeacher(teacher: Teacher) {
        this.teacher = teacher
    }
    F_addCourseInTeacherCourses(teacher: Teacher) {
        teacher.F_assignCourse(this)
    }

}

export class Student extends Person {
    studentID: number = Math.floor(Math.random() * (9 * (Math.pow(10, 4)))) + (Math.pow(10, 4)) // 5 digit random number
    balance: number = 2000
    courses: Course[] = []
    constructor(name: string, age: number) {
        super(name, age)
    }
    F_registerInCourse(course: Course) {
        this.courses.push(course)
        this.F_submitFee(course.fee)
    }
    F_addStudentInCourseStudents(course: Course) {
        course.F_registerStudent(this)
    }
    F_submitFee(fee: number) {
        this.balance -= fee
    }
}


export class Teacher extends Person {
    teacherID: number = Math.floor(Math.random() * (9 * (Math.pow(10, 4)))) + (Math.pow(10, 4)) 
    courses: Course[] = []
    constructor(name: string, age: number) {
        super(name, age)
    }
    F_assignCourse(course: Course) {this.courses.push(course)}
    F_addTeacherInCourseTeacher(course: Course) {course.F_setTeacher(this)}
}