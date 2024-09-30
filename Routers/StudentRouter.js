import express from 'express';
import { changeMentor, createStudent, getAllStudents, getPreMentors } from '../Controllers/StudentController.js';



const router = express.Router();

// 1. POST method , Create a Student :
router.post('/createstudent', createStudent)

// 2. GET method, Get All students details :
router.get('/getallstudents', getAllStudents)

//3. PUT method, Change mentor for particular student :
router.put('/changementor/:studentId',changeMentor);

// 4. GET method, Previous Mentors for a Student :
router.get('/getPreviousMentors/:studentId',getPreMentors);



export default router;