import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useRouter } from "next/router";

export default function BottomNav({ routeNum }) {
  const router = useRouter();
  return (
    <>
      <BottomNavigation showLabels value={routeNum}>
        <BottomNavigationAction
          //   label="Home"
          onClick={() => {
            router.push("home");
          }}
          icon={<i className="fa-solid fa-house w-5 h-5"></i>}
        />
        <BottomNavigationAction
          onClick={() => {
            router.push("course");
          }}
          //   label="Courses"
          icon={<i className="fa-solid fa-book-bookmark w-5 h-5"></i>}
        />
        <BottomNavigationAction
          //   label="Attendance"
          icon={<i className="fa-solid fa-clipboard-user w-5 h-5"></i>}
        />
        <BottomNavigationAction
          //   label="Timetable"
          icon={<i className="fa-solid fa-calendar-days w-5 h-5"></i>}
        />
      </BottomNavigation>
    </>
  );
}
