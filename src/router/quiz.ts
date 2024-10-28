import { Router } from "express";
import { addQuiz , getQuestion, getServer, getCategories} from "../controller/quiz";
const router = Router()

// get server 
router.get('/', getServer)

// add quiz
router.post('/add', addQuiz)

// getQuestion
router.get('/categories', getCategories)

// getQuestion
router.get('/questions/:category', getQuestion)


export default router