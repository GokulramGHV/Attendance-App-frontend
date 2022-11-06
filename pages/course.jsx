import { useEffect } from "react";
import ButtonAppBar from "../components/Appbar";
import BottomNav from "../components/BottomNav";
import { getCourses } from "../utils/apiUtils";

export default function Course() {
  // console.log(data);
  const fetchData = async () => {
    const data = await getCourses();
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="min-h-screen py-16">
      <ButtonAppBar title="Courses" />

      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={1} />
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   let returnVal;
//   try {
//     const data = await getCourses();
//     returnVal = {
//       props: {
//         data,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     returnVal = {
//       props: {
//         data: "Error",
//       },
//     };
//   }
//   return returnVal;
// }
