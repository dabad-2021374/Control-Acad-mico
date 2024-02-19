'use strict'

import Course from './course.model.js'
import AssingCourse from '../asingCourse/assignCourse.model.js'
import { checkUpdate } from '../utils/validator.js'

export const addCourse = async (req, res) => {
    try {
        let data = req.body
        console.log(data)

        let course = new Course(data)
        await course.save()

        return res.send({ message: `Registered successfully course` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering course', err: err })
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        // Desasignar automaticamente de los cursos a los estudiantes con el id de ese curso
        await AssingCourse.deleteMany({ course: id });

        // Eliminar el curso
        const deletedCourse = await Course.deleteOne({ _id: id });

        if (deletedCourse.deletedCount === 0) return res.status(404).send({ message: 'Course not found and not deleted' });
        return res.send({ message: 'Deleted course successfully' });
    } catch (err) {
        console.error(err);
        return res.status(404).send({ message: 'Error deleting course' });
    }
}

export const updateCourse = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        //Capturar el id del curso a actualizar
        let { id } = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'You have sent data that cannot be updated' })
        //Actualizar
        let updateCourse = await Course.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        //Validar la actualización
        if (!updateCourse) return res.status(404).send({ message: 'Course not found and not updated' })
        //Responder si todo sale bien
        return res.send({ message: 'Course updated successfully', updateCourse })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating Course' })
    }
}

export const searchCoursesByTeacher = async (req, res) => {
    try {
        // Obtener el parámetro de búsqueda
        const { teacherId } = req.body;
        // Buscar cursos por el ID del profesor
        const courses = await Course.find({ teacher: teacherId }).populate('teacher', ['name', 'surname', 'username', 'email', 'phone', 'role']);
        // Validar la respuesta
        if (!courses.length) return res.status(404).send({ message: 'Courses not found' });
        // Responder si todo sale bien
        return res.send({ message: 'Courses found', courses });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error searching courses' });
    }
}

export const getCouses = async (req, res) => {
    try {
        let courses = await Course.find();
        return res.send({courses});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error fetching courses', err: err });
    }
}
