'use strint'

import { Router } from "express"
import { 
    validateJwt,
    isTeacher,
    isStudent
} from '../middlewares/validate-jwt.js';
import { assingCourse, searchCoursesByStudent } from "./assignCourse.controller.js"

const api = Router()

api.post('/assingCourse', [validateJwt], assingCourse)
api.post('/searchCoursesByStudent', [ validateJwt, isStudent], searchCoursesByStudent)

export default api