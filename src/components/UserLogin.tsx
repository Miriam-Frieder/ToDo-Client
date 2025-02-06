import { FormEvent, useState, useEffect } from "react";
import { User } from "./Types";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { register, login, saveAccessToken } from "../service";
import { useNavigate, useLocation } from "react-router-dom";

const emptyUser:User={
  username: "",
  password: "",
}

const Login = ({ isRegister }: { isRegister: boolean }) => {
  const [userData, setUserData] = useState<User>(emptyUser);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      setOpen(false);
    }
  }, [location.pathname]);

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isRegister) {
        response = await register(userData.username??"", userData.password??"");
      } else {
        response = await login(userData.username??"", userData.password??"");
      }

      if (response && response.data?.token) {
        saveAccessToken(response.data);

        setUserData(emptyUser);
        navigate("/todos", { replace: true });
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => navigate("/", { replace: true })}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          width: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h1" textAlign="center" id="login-modal-title">
          {isRegister ? "Sign Up" : "Login"}
        </Typography>

        <TextField
          id="username"
          label="User Name"
          type="text"
          variant="outlined"
          fullWidth
          value={userData.username}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={userData.password}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth>
          Continue
        </Button>

        {!isRegister && (
          <Typography variant="body2" textAlign="center" mt={2}>
            Don't have an account?{" "}
            <Button onClick={() => { navigate("/signup") }} sx={{ color: "#1976d2", fontWeight: "bold" }}>
              Sign up
            </Button>
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default Login;
