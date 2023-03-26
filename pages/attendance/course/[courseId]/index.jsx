import { Button, Card, CardActions, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonAppBar from "../../../../components/Appbar";
import BottomNav from "../../../../components/BottomNav";
import {
  API_BASE_URL,
  // all_sessions_attendance,
  getCourseSessions,
} from "../../../../utils/apiUtils";
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
    if (!courseId) return;
    fetchData();
  }, [courseId]);

  return (
    <>
      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Attendance" />
        <h2 className="mt-5 text-2xl font-bold text-gray-800">Sessions List</h2>
        <p className="text-gray-600">
          List of all sessions of the course with id: {courseId}
        </p>
        <Button
          variant="outlined"
          className="mt-3 w-full"
          onClick={() => router.push(`/course/${courseId}`)}
        >
          View Students attendance
        </Button>
        <Button
          variant="outlined"
          className="w-full mt-2"
          onClick={async () => {
            axios
              .get(`${API_BASE_URL}all_sessions_attendance/${courseId}/`, {
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
          <i className="fa fa-download mr-2"></i>
          Download Attendance
        </Button>
        <Button
          variant="outlined"
          className="w-full mt-2"
          onClick={() => router.push(`/session/${courseId}/add`)}
        >
          <i className="fa fa-plus mr-2"></i>
          Create New Session
        </Button>
        <p className="text-gray-600 my-4">
          Total no. of sessions: {sessions.length}
        </p>
        <div className="grid gap-4 drop-shadow-sm">
          {sessions.map((session, i) => {
            return (
              <Card variant="outlined" key={i}>
                <CardContent className="pb-0">
                  <h3 className="font-medium text-gray-800 mb-1">
                    Session - {i + 1}
                  </h3>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Session ID:</span>{" "}
                    {session.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Datetime:</span>{" "}
                    {new Date(session.session).toDateString()}
                  </p>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      router.push(
                        `/attendance/course/${courseId}/session/${session.id}/`
                      );
                    }}
                  >
                    View Attendance
                  </Button>
                </CardActions>
              </Card>
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
