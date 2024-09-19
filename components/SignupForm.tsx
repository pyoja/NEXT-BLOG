"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idEroor, setidEroor] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleUsernameCheck = async () => {
    const response = await fetch("/api/check-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.exists) {
      setidEroor("이미 존재하는 아이디입니다.");
    } else {
      setidEroor("사용할 수 있는 아이디입니다.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (idEroor) {
      return;
    }
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, password }),
    });
    if (response.ok) {
      router.push("/");
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      noValidate
      sx={{ width: "100%" }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={id}
        onChange={(e) => setId(e.target.value)}
        error={!!idEroor}
        helperText={idEroor}
      />
      <Button onClick={handleUsernameCheck} variant="outlined" sx={{ mt: 1 }}>
        ID 중복체크
      </Button>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        회원가입
      </Button>
      <Typography variant="body2" align="center">
        이미 계정이 있으신가요?{" "}
        <Button onClick={() => router.push("/")}>로그인</Button>
      </Typography>
    </Box>
  );
}
