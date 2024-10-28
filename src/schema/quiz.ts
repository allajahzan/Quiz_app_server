import { model, Schema } from "mongoose";

interface schemaType {
    No: number
    category:string,
    question: string
    answer: string,
    options: string[]
}

const quizSchema = new Schema<schemaType>({
    No: {
        type: Number,
    },
    category:{
        type:String,
        required:true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: []
})

quizSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastQuiz = await Quiz.findOne().sort({ No: -1 }).exec();
        this.No = lastQuiz ? lastQuiz.No + 1 : 1; 
    }
    next();
});

const Quiz = model('Quiz', quizSchema)
export default Quiz