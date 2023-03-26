import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonAppBar from "../../../../../components/Appbar";
import BottomNav from "../../../../../components/BottomNav";
import {
  API_BASE_URL,
  getCourseStudents,
  getSessionAttendance,
} from "../../../../../utils/apiUtils";
import { Button, Card, CardContent } from "@mui/material";
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
      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Attendance" />
        <h1 className="font-semibold text-xl mb-2 mt-5 text-gray-800">
          Session ID: {sessionId}
        </h1>
        <Card variant="outlined">
          <CardContent className="pb-4">
            <p className="text-gray-500">
              <span className="font-medium">No. of students present:</span>{" "}
              {allStudents.length - absentStudents.length}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">No. of students absent:</span>{" "}
              {absentStudents.length}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Total no. of students:</span>{" "}
              {allStudents.length}
            </p>
            {/* <p className="text-sm text-gray-500">
                  <span className="font-medium">Datetime:</span>{" "}
                  {new Date(session.session).toDateString()}
                </p> */}
          </CardContent>
        </Card>
        <Button
          variant="outlined"
          className="mt-5"
          onClick={async () => {
            axios
              .get(`${API_BASE_URL}filetest/${courseId}/${sessionId}/`, {
                method: "GET",
                responseType: "blob", // important
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
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
        <div className="grid gap-4 mt-5">
          {allStudents.map((student) => {
            return (
              <div
                key={student.id}
                className={`${
                  absentStudents.includes(student.id)
                    ? "bg-red-200 border-red-300 border-[2px]"
                    : "bg-green-200 border-green-300 border-[2px]"
                } rounded-lg px-8 py-4 shadow font-medium  text-gray-800`}
              >
                {student.reg_no} - {student.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={2} />
      </div>
    </>
  );
}
