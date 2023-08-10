import Alert from "@mui/material/Alert";
import React, { useState } from "react";
const Alertt = ({ message, severity }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  setTimeout(handleClose, 3000);
  return (
    <>
      {open && (
        <Alert severity={severity} variant="outlined" onClose={handleClose}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default Alertt;
