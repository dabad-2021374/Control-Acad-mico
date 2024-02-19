import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import userRoutes from '../src/user/user.routes.js'
import courseRoutes from '../src/course/course.routes.js'
import assignCourseRoutes from '../src/asingCourse/assignCourse.routes.js'

const app = express()
config()
const port = process.env.PORT 

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(userRoutes)
app.use(courseRoutes)
app.use(assignCourseRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server running ${port}`)
}