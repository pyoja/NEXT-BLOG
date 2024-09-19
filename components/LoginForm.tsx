"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });
    if (response.ok) {
      alert("로그인 성공");
    } else {
      const data = await response.json();
      console.error(data.error);
      alert("로그인 실패");
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      noValidate
      sx={{ width: "100%" }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="id"
        label="id"
        name="id"
        autoComplete="id"
        autoFocus
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleSignup}
        sx={{ mt: 1 }}
      >
        Sign Up
      </Button>
    </Box>
  );
}
