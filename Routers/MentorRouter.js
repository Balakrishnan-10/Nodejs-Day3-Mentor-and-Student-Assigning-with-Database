import express from 'express';
import { addMultipleStudent, assignStudentToMentor, createMentor, getAllMentors, getAllMentorsById} from '../Controllers/MentorController.js';

const router = express.Router();

// 1. POST method , Create a Mentor :
router.post('/creatementor',createMentor );

// 2. GET method, Get All mentor details :
router.get('/getallmentors',getAllMentors );

// 3. GET BY ID method, Show all the students for particular mentor :
router.get('/getallmentorsbyid/:id',getAllMentorsById );

// 3. POST method, Assigning Student to mentor :
router.post('/students/:mentorId/:studentId',assignStudentToMentor)

// 4. POST method, Add multiple student to one mentor :
router.post('/students/:mentorId',addMultipleStudent);



export default router;