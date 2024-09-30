// Schema is a mongoDB collection structure :

import mongoose from "mongoose";

const stuSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  mentors: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
  },
  previousMentor: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
      },
     
});

const Student = mongoose.model("Student", stuSchema);

export default Student;
