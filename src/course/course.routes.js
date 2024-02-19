'use strict'

import { Router } from "express"
import { 
    validateJwt,
    isTeacher
} from '../middlewares/validate-jwt.js';
import { addCourse, deleteCourse, updateCourse, searchCoursesByTeacher, getCouses } from './course.controller.js'

const api = Router()

api.post('/addCourse', [validateJwt, isTeacher], addCourse)
api.delete('/deleteCourse/:id', [validateJwt, isTeacher], deleteCourse)
api.put('/updateCourse/:id', [validateJwt, isTeacher], updateCourse)
api.post('/searchCoursesByTeacher', [validateJwt, isTeacher],  searchCoursesByTeacher)
api.get('/getCourses', [validateJwt], getCouses)

export default api