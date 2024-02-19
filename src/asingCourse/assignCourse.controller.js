'use strint'

import AssingCourse from './assignCourse.model.js'
import User from '../user/user.model.js';
import Course from '../course/course.model.js'

export const assingCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // Verificar si el estudiante existe
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }

        // Verificar si el estudiante ya esta asignado a este curso
        const existingAssignment = await AssingCourse.findOne({ student: studentId, course: courseId });
        if (existingAssignment) {
            return res.status(400).send({ message: 'The student is already assigned to this course' });
        }

        // Verificar si el estudiante ya está asignado a 3 cursos
        const assignedCoursesCount = await AssingCourse.countDocuments({ student: studentId });
        if (assignedCoursesCount >= 3) {
            return res.status(400).send({ message: 'You have already been assigned to 3 courses' });
        }

        // Crear y guardar la asignación del curso
        const newAssignment = new AssingCourse({ student: studentId, course: courseId });
        await newAssignment.save();

        return res.send({ message: `Correctly assigned to the course` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Not assigned correctly to the course', err: err });
    }
}

export const searchCoursesByStudent = async (req, res) => {
    try {
        const { username } = req.body;

        // Buscar el ID del estudiante por su nombre de usuario
        const student = await User.findOne({ username });
        if (!student) return res.status(404).send({ message: 'Student not found' });

        // Buscar cursos en los que el estudiante está asignado
        const courses = await AssingCourse.find({ student: student._id }).populate('course', ['name', 'description', 'price', 'duration', 'teacher']);

        // Validar la respuesta
        if (!courses.length) return res.status(404).send({ message: 'Courses not found' });

        // Responder si todo sale bien
        return res.send({ message: 'Courses found', courses });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error searching courses by student', err: err });
    }
};
