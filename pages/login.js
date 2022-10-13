import { ButtonBase, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(()=> {
  //   console.log(username, password)
  // }, [username, password]);

  const submit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
      const resp = await fetch("http://10.7.6.30:8000/auth/login/", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      console.log(resp);
      localStorage.setItem("token", resp);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const handleOnChange = (val, setState) => {
    setState((state) => val);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-10">Attendance App</h1>

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
          onClick={submit}
          className="text-lg px-6 py-2 bg-blue-600 ring-blue-600 ring-2 rounded-md text-white shadow-lg"
        >
          Log In
        </ButtonBase>
        <ButtonBase className="text-lg px-5 py-2 ring-blue-600 ring-2 rounded-md text-blue-600 shadow-lg">
          <Link href="/signup">Sign Up</Link>
        </ButtonBase>
      </div>
    </div>
  );
}
