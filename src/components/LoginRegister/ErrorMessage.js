import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import AlertTitle from "@mui/material/AlertTitle";
const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>{children}</strong>
      </Alert>
    </Stack>
  );
};

export default ErrorMessage;
