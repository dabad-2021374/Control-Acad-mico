import express from 'express'
import { 
    validateJwt,
    isTeacher
} from '../middlewares/validate-jwt.js';
import {
    testU,
    login, 
    updateU, 
    deleteU,
    registerS,
    registerT
} from './user.controller.js';

const api = express.Router();

//Publicas
api.post('/registerS', registerS)
api.post('/registerT', registerT)
api.post('/login', login)

//Privadas
api.get('/testU', [validateJwt, isTeacher], testU)
api.put('/updateU/:id', [validateJwt], updateU)
api.delete('/deleteU/:id', [validateJwt], deleteU)

export default api