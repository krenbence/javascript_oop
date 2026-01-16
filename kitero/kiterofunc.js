function Student(name){
    this.name = name
    this.askedQuestionNumber = 0
}

Student.prototype.askedQuestion = function(){
    console.log("???")
    this.askedQuestionNumber++
}

const stu1 = new Student("Bence")

console.log(stu1)
stu1.askedQuestion()
console.log(stu1)

const stu2 = new Student("Szabolcs")
console.log(stu2)

function StudentWithWork(name){
    Student.call(this, name)
    this.Workdone = 0
}

StudentWithWork.prototype.doWork = function(){

}

Object.setPrototypeOf(StudentWithWork.prototype, Student.prototype )

stu3 = new StudentWithWork("mewtwo")
stu3.askedQuestion()
console.log(stu3)
stu3.doWork()
console.log(stu3)                                                                                                                                                                                                                                                                                                                                                            