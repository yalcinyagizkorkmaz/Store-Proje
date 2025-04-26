import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  colors,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const username = watch("username");
  const password = watch("password");

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
          Login
        </Typography>
        <Box
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
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
            disabled={!username || !password}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
