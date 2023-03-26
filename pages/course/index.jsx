import { Button, Card, CardActions, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { getCourses } from "../../utils/apiUtils";
import Loading from "../../components/Loading";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await getCourses();
      console.log(data);
      setCourses(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Error in fetching data!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Courses" />
        <h2 className=" text-2xl font-bold mt-5 text-gray-800">
          List of Courses
        </h2>
        <h5 className="text-gray-600">Click on a course to view its details</h5>
        <Button
          variant="outlined"
          className="mt-5"
          onClick={() => router.push("/course/add")}
        >
          <i className="fa fa-plus mr-2"></i>
          Add Course
        </Button>
        <div className="grid gap-4 drop-shadow-md mt-5">
          {courses.length === 0 && (
            <div className="flex justify-center items-center gap-5 mx-10 px-8 py-4 text-lg font-medium bg-white rounded-xl shadow">
              No Courses Found!
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
                    onClick={() => router.push(`/course/${course.id}`)}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
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
