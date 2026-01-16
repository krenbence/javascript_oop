class Student{
    constructor(name ){
        this.name = name
        this.askedQuestionNumber = 0
    }
    askedQuestion(){
    console.log("???")
    this.askedQuestionNumber++
}
}


const stu1 = new Student("Bence")

console.log(stu1)
stu1.askedQuestion()
console.log(stu1)

class StudentWithWork extends Student{
    constructor(name){
        super(name)
        this.doWork=0
    }
    workDone(){
        this.doWork++
    }
}
const stu2 = new StudentWithWork("Bence")
console.log(stu2)

stu2.doWork()
stu2.askedQuestion()