"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleUsernameCheck = async () => {
    const response = await fetch("/api/check-username", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (data.exists) {
      setUsernameError("이미 존재하는 아이디입니다.");
    } else {
      setUsernameError("사용할 수 있는 아이디입니다.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (usernameError) {
      return;
    }
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name, password }),
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!usernameError}
        helperText={usernameError}
      />
      <Button onClick={handleUsernameCheck} variant="outlined" sx={{ mt: 1 }}>
        Check Availability
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
        Sign Up
      </Button>
      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Button onClick={() => router.push("/")}>Login</Button>
      </Typography>
    </Box>
  );
}
