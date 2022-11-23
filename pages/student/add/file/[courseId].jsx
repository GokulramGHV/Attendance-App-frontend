import { ButtonBase, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonAppBar from "../../../../components/Appbar";
import BottomNav from "../../../../components/BottomNav";
import { createStudent } from "../../../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";
import { read } from "xlsx";
import { utils } from "xlsx";
export default function AddStudentBulk() {
  const [outputJson, setOutputJson] = useState([]);
  const router = useRouter();
  const { courseId } = router.query;
  useEffect(() => {
    if (!courseId) return;
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    // else {
    //   setStudentData((state) => {
    //     return { ...state, course_enrolled: courseId };
    //   });
    // }
  }, [router, courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit data: ", outputJson);
    try {
      for (let i = 0; i < outputJson.length; i++) {
        const submit_data = await createStudent({
          ...outputJson[i],
          course_enrolled: courseId,
        });
        console.log(submit_data);
      }
      localStorage.setItem("student_created", "true");
      router.push(`/course/${courseId}`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        setOutputJson(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
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
            id="file"
            variant="outlined"
            onChange={readUploadFile}
            className="w-full"
            helperText="Upload an excel file containing student data"
            type="file"
            required
          />
          <ButtonBase
            type="submit"
            className="mt-4 text-lg px-6 py-2 bg-blue-500 rounded-md text-white shadow-lg"
          >
            Add Students
          </ButtonBase>
        </form>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={1} />
      </div>
    </>
  );
}
