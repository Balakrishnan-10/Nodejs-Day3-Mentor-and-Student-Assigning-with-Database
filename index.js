import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Database/Config.js';
import mentorRouter from './Routers/MentorRouter.js';
import StudentRouter from './Routers/StudentRouter.js';


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

dotenv.config();

// It is the one method of PORT declare :
// const port = 4000 || process.env.PORT;

// Mentor Route :
app.use('/api', mentorRouter);

// Student Route :
app.use('/api', StudentRouter)

// Default route :

app.get('/', (req,res) => {
    res.status(200).send("Mentor and Student Assigning with Database API is running successfully!!!")
});

app.listen(process.env.PORT, () => {
    console.log("Mentor and Student Assigning with Database App running successfully !!!")
})