"use client";
import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Welcome to My Blog
          </Typography>
          <LoginForm />
        </Box>
      </Paper>
    </Container>
  );
}
