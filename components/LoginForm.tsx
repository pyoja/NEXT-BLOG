"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempted with:", username, password);
  };

  const handleSignup = () => {
    // TODO: Implement navigation to signup page
    console.log("Navigating to signup page");
    // router.push('/signup');
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
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
