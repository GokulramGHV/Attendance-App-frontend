import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonAppBar from "../../../../components/Appbar";
import BottomNav from "../../../../components/BottomNav";
import {
  // all_sessions_attendance,
  getCourseSessions,
} from "../../../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ListSessions() {
  const router = useRouter();
  const { courseId } = router.query;
  const [sessions, setSessions] = useState([]);

  const fetchData = async () => {
    const data = await getCourseSessions(courseId);
    console.log("Sessions: ", data);
    setSessions(data);
  };

  useEffect(() => {
    if (!courseId) {
      return;
    }
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      let l = localStorage.getItem("taken_attendance");
      if (l === "true") {
        toast.success("Attendance successfully recorded!");
        localStorage.setItem("taken_attendance", "false");
      }
      fetchData();
    }
  }, [courseId, router]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Attendance" />
        <Button
          variant="outlined"
          className="mx-10 mt-10"
          onClick={() => router.push(`/course/${courseId}`)}
        >
          View Students attendance
        </Button>
        <Button
          variant="outlined"
          className="mx-10 mt-5"
          onClick={async () => {
            axios
              .get(
                `http://127.0.0.1:8000/all_sessions_attendance/${courseId}/`,
                {
                  method: "GET",
                  responseType: "blob", // important
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
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
          <i className="fa fa-download mr-2"></i>
          Download Attendance
        </Button>
        <Button
          variant="outlined"
          className="mx-10 mt-5"
          onClick={() => router.push(`/session/${courseId}/add`)}
        >
          <i className="fa fa-plus mr-2"></i>
          Create New Session
        </Button>
        <div className="grid gap-4 drop-shadow-lg mt-5">
          {sessions.map((session, i) => {
            return (
              <div
                key={i}
                className="mx-10 bg-white shadow-lg px-10 py-3 rounded-lg hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push(
                    `/attendance/course/${courseId}/session/${session.id}/`
                  );
                }}
              >
                <h4 className="text-xl font-semibold text-gray-800">
                  Session - {i}
                </h4>
                <p>Session ID: {session.id} </p>
                <p>Datetime: {session.session}</p>
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
