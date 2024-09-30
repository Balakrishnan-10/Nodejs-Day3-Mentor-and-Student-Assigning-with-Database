import Student from "../Models/StudentSchema.js";
import Mentor from "../Models/MentorSchema.js";
// 1. POST method , Create a Student :
export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res
      .status(200)
      .json({ message: "Student create successfully", Data: newStudent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Interval server error in student create method" });
  }
};

// 2. GET method, Get All students details :
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: "All studets Details", Data: students });
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .json({ message: "Intrenal server error in GET all students method" });
  }
};

// 3. PUT method,Change mentor for particular student :
export const changeMentor = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { newMentorId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const oldMentorId = student.mentors;
    if (oldMentorId) {
      student.previousMentor.push(oldMentorId);
    }
    student.mentors = newMentorId;
    await student.save();

    // Remove student from old mentor's list
    if (oldMentorId) {
      await Mentor.findByIdAndUpdate(oldMentorId, {
        $pull: { students: studentId },
      });
    }
    // Add student to new mentor's list
    await Mentor.findByIdAndUpdate(newMentorId, {
      $push: { students: studentId },
    });

    res.status(200).json({ message: "Mentor changed successfully", student });
  } catch (error) {}
};

// 4. GET method, Previous Mentors for a Student :
export const getPreMentors = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "previousMentor",
      "mentorName"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({
        message: "List of Previous Mentors for Student",
        previousMentor: student.previousMentor,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal Server Error in get previous mentors for student",
      });
  }
};
