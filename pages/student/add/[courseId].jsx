import { ButtonBase, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonAppBar from "../../../components/Appbar";
import BottomNav from "../../../components/BottomNav";
import { createStudent } from "../../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";

export default function AddStudent() {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    reg_no: "",
    course_enrolled: "",
  });
  const router = useRouter();
  const { courseId } = router.query;
  useEffect(() => {
    if (!courseId) return;
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      setStudentData((state) => {
        return { ...state, course_enrolled: courseId };
      });
    }
  }, [router, courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit data: ", studentData);
    try {
      const submit_data = await createStudent(studentData);
      localStorage.setItem("student_created", "true");
      router.push(`/course/${courseId}`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (value, field) => {
    setStudentData((state) => {
      return { ...state, [field]: value };
    });
  };

  return (
    <>
      <ToastContainer />
      <ButtonAppBar title="Students" />
      <div className="min-h-screen py-16 flex justify-center items-center px-10">
        <form onSubmit={handleSubmit} className="w-full grid gap-4">
          <h1 className="text-xl font-bold mb-4 text-center">
            Add Student Data
          </h1>
          <TextField
            id="name"
            label="Student Name"
            variant="outlined"
            value={studentData.name}
            onChange={(e) => handleChange(e.target.value, "name")}
            className="w-full"
            required
          />
          <TextField
            id="reg_no"
            label="Registration No."
            variant="outlined"
            value={studentData.reg_no}
            onChange={(e) => handleChange(e.target.value, "reg_no")}
            className="w-full"
            required
          />
          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            value={studentData.email}
            onChange={(e) => handleChange(e.target.value, "email")}
            className="w-full"
            type="email"
            required
          />
          <ButtonBase
            type="submit"
            className="mt-4 text-lg px-6 py-2 bg-blue-500 rounded-md text-white shadow-lg"
          >
            Add Student
          </ButtonBase>
        </form>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={1} />
      </div>
    </>
  );
}
