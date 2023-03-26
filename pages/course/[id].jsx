import { Button, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
// import AddStudent from "../../components/AddStudent";
import { getCourse, getCourseStudents } from "../../utils/apiUtils";
import Loading from "../../components/Loading";
export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await getCourse(id);
    const student_data = await getCourseStudents(id);
    setDetails(data);
    setStudents(student_data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id, fetchData]);

  return (
    <>
      <Loading isLoading={loading} />
      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Courses" />
        <h2 className="text-2xl font-bold mt-5 mb-3">Course Details</h2>
        <Card variant="outlined">
          <CardContent className="pb-4">
            <h3 className="font-medium text-gray-800 mb-1">{details.name}</h3>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Block Hours:</span>{" "}
              {details.block_hours}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Created On:</span>{" "}
              {new Date(details.created_at).toDateString()}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Course ID:</span> {details.id}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">No. of students:</span>{" "}
              {students.length}
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-left mt-5 gap-2">
          {" "}
          <Button
            variant="outlined"
            className=""
            onClick={() => router.push(`/student/add/${id}`)}
          >
            <i className="fa fa-plus mr-2"></i>
            Add Student
          </Button>{" "}
          <Button
            variant="outlined"
            className=""
            onClick={() => router.push(`/student/add/file/${id}`)}
          >
            {/*fontawewome icon for upload*/}
            <i class="fa-solid fa-file-arrow-up mr-2"></i>
            Upload Students List
          </Button>
        </div>

        <div className="w-full mt-5">
          {students.length === 0 && (
            <div className="text-lg text-gray-600 font-semibold flex justify-center rounded-lg py-4 shadow-sm border-[2px] border-gray-200 mb-4">
              No students have enrolled!
            </div>
          )}
          {students.map((student) => {
            return (
              <div
                key={student.id}
                className="flex bg-white rounded-lg items-center py-3 gap-4 hover:scale-105 cursor-pointer"
                onClick={() => router.push(`/student/${student.id}/`)}
              >
                <div className="bg-blue-200 rounded-full h-fit px-5 py-3 text-xl font-bold text-white">
                  {student.name.slice(0, 1)}
                </div>
                <div>
                  <div className="w-[100px] text-gray-800">
                    <div className="whitespace-nowrap text-ellipsis overflow-hidden font-semibold">
                      {student.name}
                    </div>
                    <div> {student.reg_no}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div
                    className={`text-white rounded-md h-full w-fit px-3 pb-2 pt-3 flex justify-center items-center text-sm font-bold ${
                      student.attendance_percentage > 0.75
                        ? "bg-green-500"
                        : "bg-red-400"
                    }`}
                  >
                    {(student.attendance_percentage * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={1} />
      </div>
    </>
  );
}
