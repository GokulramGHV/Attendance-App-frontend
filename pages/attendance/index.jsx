import { Button, Card, CardActions, CardContent } from "@mui/material";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCourses } from "../../utils/apiUtils";

export default function AttendanceHome() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  return (
    <>
      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Attendance" />
        <h2 className=" text-2xl font-bold mt-5 text-gray-800">Courses List</h2>
        <h5 className="text-gray-600">
          Select a course to view attendance details
        </h5>
        <div className="grid gap-4 drop-shadow-lg mt-5">
          {courses.length === 0 && (
            <div className="flex justify-center items-center gap-5 px-8 py-4 text-lg font-medium bg-white rounded-xl shadow">
              No courses found!
            </div>
          )}
          {courses.map((course, i) => {
            return (
              <Card key={i} variant="outlined">
                <CardContent className="pb-0">
                  <h2 className="font-medium text-gray-800 mb-1">
                    {course.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Block Hours: {course.block_hours}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created On: {new Date(course.created_at).toDateString()}
                  </p>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() =>
                      router.push(`/attendance/course/${course.id}`)
                    }
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
