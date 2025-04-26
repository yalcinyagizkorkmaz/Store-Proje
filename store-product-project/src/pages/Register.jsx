import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import requests from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const username = watch("username");
  const email = watch("email");
  const password = watch("password");

  function handleForm(data) {
    requests.account
      .register(data)
      .then(() => {
        toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error("Bu kullanıcı adı veya email zaten kayıtlı!");
        } else {
          toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      });
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 2 }} elevation={3}>
        <Avatar sx={{ mx: "auto", mb: 2, color: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Register
        </Typography>
        <Box
          onSubmit={handleSubmit(handleForm)}
          noValidate
          component="form"
          sx={{ mb: 2 }}
        >
          <TextField
            {...register("username", { required: "Username zorunlu alan " })}
            name="username"
            label="Enter username"
            size="small"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("email", {
              required: "Email zorunlu alan",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Geçerli bir email adresi giriniz",
              },
            })}
            name="email"
            type="email"
            label="Enter email"
            size="small"
            fullWidth
            required
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", { required: "Password zorunlu alan " })}
            name="password"
            type="password"
            label="Enter password"
            size="small"
            fullWidth
            required
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            color="secondary"
            disabled={!username || !email || !password}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
