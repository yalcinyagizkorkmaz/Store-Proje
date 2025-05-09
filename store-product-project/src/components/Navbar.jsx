import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Badge,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import IconButton from "@mui/material/IconButton";
import { NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useCartContext } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    updateUser(null);
    navigate("/login");
  };

  const links = user
    ? [
        { title: "Home", to: "/" },
        { title: "Product", to: "/product" },
      ]
    : [];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { cart } = useCartContext();
  const cartItemCount = cart
    ? cart.cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton color="inherit" component={Link} to="/">
            <StorefrontIcon />
          </IconButton>
          {links.map((link) => (
            <Button
              color="inherit"
              component={NavLink}
              to={link.to}
              key={link.title}
            >
              {link.title}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user && (
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              size="large"
              edge="start"
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography variant="body1" sx={{ color: "white" }}>
                {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/login">
                Giriş Yap
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Kayıt Ol
              </Button>
            </div>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {links.map((link) => (
              <MenuItem key={link.title} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{link.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
