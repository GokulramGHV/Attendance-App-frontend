import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "../../../../../components/Appbar";
import BottomNav from "../../../../../components/BottomNav";
import {
  getCourseStudents,
  getSessionAttendance,
} from "../../../../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import axios from "axios";

export default function ListSessions() {
  const router = useRouter();
  const { courseId, sessionId } = router.query;
  const [allStudents, setAllStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const fetchAllStudentsData = async () => {
    const data = await getCourseStudents(courseId);
    setAllStudents(data);
    console.log("All Students: ", data);
  };

  const fetchAbsentStudentsData = async () => {
    const data = await getSessionAttendance(sessionId);
    console.log("Absentees: ", data);
    let absentIDs = [];
    data.forEach((item) => {
      absentIDs.push(item.student.id);
    });
    console.log("Absent List:", absentIDs);
    setAbsentStudents(absentIDs);
  };

  useEffect(() => {
    if (!courseId || !sessionId) {
      return;
    }
    fetchAllStudentsData();
    fetchAbsentStudentsData();
  }, [courseId, sessionId]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Attendance" />
        <div className="grid gap-4 drop-shadow-lg mt-5">
          <div className="mx-10">
            <h1 className="font-semibold text-xl mb-2">
              Session ID: {sessionId}
            </h1>
            <p>
              No. of students present:{" "}
              {allStudents.length - absentStudents.length}
            </p>
            <p>No. of students absent: {absentStudents.length}</p>
            <p>Total no. of students: {allStudents.length}</p>
            <Button
              variant="outlined"
              className="mt-5"
              onClick={async () => {
                axios
                  .get(
                    `http://127.0.0.1:8000/filetest/${courseId}/${sessionId}/`,
                    {
                      method: "GET",
                      responseType: "blob", // important
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((response) => {
                    const url = window.URL.createObjectURL(
                      new Blob([response.data])
                    );
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${Date.now()}.xlsx`);
                    document.body.appendChild(link);
                    link.click();
                  });
              }}
            >
              <i className="fa fa-plus mr-2"></i>
              Export Attendance
            </Button>
          </div>

          {allStudents.map((student) => {
            return (
              <div
                key={student.id}
                className={`${
                  absentStudents.includes(student.id)
                    ? "bg-red-200"
                    : "bg-green-200"
                } rounded-lg px-8 py-4 mx-10 shadow-md  mb-4`}
              >
                {student.reg_no} - {student.name}
              </div>
            );
          })}
        </div>
        <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
          <BottomNav routeNum={2} />
        </div>
      </div>
    </>
  );
}
