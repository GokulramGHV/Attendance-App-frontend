import { ButtonBase, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../utils/apiUtils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await login(username, password);
      localStorage.setItem("token", resp.key);
      localStorage.setItem("login", "true");
      router.push("home");
    } catch (err) {
      // console.log(err);
      console.log(err.non_field_errors);
      if (err.non_field_errors) {
        for (let i = 0; i < err.non_field_errors.length; i++) {
          toast.error(`${err.non_field_errors[i]}`);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleOnChange = (val, setState) => {
    setState((state) => val);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-10">Attendance App</h1>

      <form onSubmit={submit}>
        <div className="grid gap-6">
          <TextField
            required
            label="Username"
            value={username}
            onChange={(e) => {
              handleOnChange(e.target.value, setUsername);
            }}
          />
          <TextField
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              handleOnChange(e.target.value, setPassword);
            }}
          />
        </div>
        <div className="flex gap-[1.3rem] mt-12">
          <ButtonBase
            // onClick={submit}
            type="submit"
            className="text-lg px-6 py-2 bg-blue-600 ring-blue-600 ring-2 rounded-md text-white shadow-lg"
          >
            Log In
          </ButtonBase>
          <ButtonBase className="text-lg px-5 py-2 ring-blue-600 ring-2 rounded-md text-blue-600 shadow-lg">
            <Link href="/signup">Sign Up</Link>
          </ButtonBase>
        </div>
      </form>
    </div>
  );
}
