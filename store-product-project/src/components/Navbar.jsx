import * as React from "react";
import { AppBar, Toolbar, Box, Button, Badge } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
export default function Navbar() {
  const links = [
    { title: "Home", to: "/" },
    { title: "Product", to: "/product" },
  ];

  const authlinks = [
    { title: "Login", to: "/login" },
    { title: "Register", to: "/register" },
  ];
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton color="inherit">
            <StorefrontIcon />
          </IconButton>
          {links.map((link) => (
            <Button color="inherit" component={NavLink} to={link.to}>
              {link.title}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            size="large"
            edge="start"
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {authlinks.map((link) => (
            <Button color="inherit" component={NavLink} to={link.to}>
              {link.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
