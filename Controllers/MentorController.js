import Mentor from "../Models/MentorSchema.js";
import Student from "../Models/StudentSchema.js"

// 1. POST method, Create a Mentor :
export const createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor (req.body);
    await newMentor.save();
    res.status(200).json({message : "Mentor created successfully", Data: newMentor})
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .json({
        message: "Internal server error in POST method by create mentor",
      });
  }
};

// 2. GET method, Get All mentor details :
export const getAllMentors = async (req,res) => {
    try {
        const mentors = await Mentor.find().populate("students");
       // console.log(mentors)
        res.status(200).json({message:"All mentors Details",Data: mentors})
        
    } catch (error) {
       // console.log(error);
       res.status(500).json({message:"Intrenal server error in GET all mentors method"}) 
    }
}

//3. GET BY ID method, Show all the students for particular mentor :
export const getAllMentorsById = async (req,res) => {
  try {
      const mentors = await Mentor.findById(req.params.id).populate("students");
     // console.log(mentors)
      res.status(200).json({message:"Show all the students for particular mentor",Data: mentors})
      
  } catch (error) {
     // console.log(error);
     res.status(500).json({message:"Intrenal server error in GET By ID mentors method"}) 
  }
}

// 4. Post method, Assign a student to mentor :
export const assignStudentToMentor = async(req,res) =>{
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    if(!mentor){
      return res.status(404).json({ message: "Mentor not found" });
    }
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
   
    mentor.students.push(student);
    await mentor.save();

    student.mentors = mentor;
    await student.save();

    res.status(200).json({ message: "Assigning student to mentor successfully",Data:mentor});

} catch (error) {
    res.status(500).json({message:"Internal server error by Assign student to mentor"})
  }
}

// 4. POST method, Add multiple student to one mentor :
export const addMultipleStudent = async(req,res) => {
  const mentor = await Mentor.findById(req.params.mentorId);
  if (!mentor) {
    return res.status(404).json({message:"Mentor Not found"});
  }

  const studentIds = req.body.studentIds;
  const students = await Student.find({_id:{$in:studentIds}});
  if (!students){
    return res.status(404).json({message:"Student Not found"});
  }

  mentor.students.push(...students);
  await mentor.save();

  for (const student of students) {
    student.mentors =mentor;
    await student.save();
  }
  res.status(200).json({ message: "Students added to mentor successfully",Data:mentor});
}

