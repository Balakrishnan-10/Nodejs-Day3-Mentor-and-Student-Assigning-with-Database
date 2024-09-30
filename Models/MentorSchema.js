// Schema is a mongoDB collection structure :

import mongoose from "mongoose";

const mentSchema = new mongoose.Schema({
  mentorName: String,
  mentorEmail: String,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Mentor = mongoose.model("Mentor", mentSchema);

export default Mentor;
