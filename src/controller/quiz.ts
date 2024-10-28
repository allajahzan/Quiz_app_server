import { Request, Response } from "express";
import Quiz from "../schema/quiz";

export const getServer = (req: Request, res: Response) => {
    res.send("server is running on port 5000")
}

export const addQuiz = async (req: Request, res: Response) => {
    try {
        const { category, question, answer, options } = req.body
        const quiz = new Quiz({ category, question, answer, options })
        await quiz.save()
        res.status(200).json({ msg: 'successfully added' })
    } catch (err) {
        console.log(err)
    }
}

export  const getCategories = async(req:Request, res:Response) =>{
    try{
        const categories = await Quiz.distinct('category')       
        res.status(200).json({categories})  
    }catch(err){
        console.log(err)
    }
}

export const getQuestion = async (req: Request, res: Response) => {
    try {
        const category = req.params.category
        const quizs = await Quiz.find({category})
        const quiz = shuffleArray(quizs)

        console.log(quiz);
        
        res.status(200).json({ quiz })
    } catch (err) {
        console.log(err)
    }
}


const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
