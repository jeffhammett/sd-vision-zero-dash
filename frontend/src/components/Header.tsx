import React from "react";
import { AppBar, Toolbar, Typography, ButtonBase, Box } from "@mui/material";
import bikeSDLogo from "../assets/bikeSDLogo.jpg";

const Header: React.FC = () => {
  const handleLogoClick = (): void => {
    window.open("https://www.bikesd.org", "_blank", "noopener,noreferrer");
  };

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        bgcolor: "primary.dark",
        borderBottom: 3,
        borderColor: "primary.main",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1.5, px: 4 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: "1.8rem",
            letterSpacing: "0.5px",
            color: "primary.contrastText",
          }}
        >
          San Diego Vision Zero Progress Tracker
        </Typography>
        <ButtonBase
          onClick={handleLogoClick}
          aria-label="Visit BikeSd website"
          sx={{
            border: 2,
            borderColor: "primary.main",
            borderRadius: 1,
            p: "4px",
            bgcolor: "rgba(255, 255, 255, 0.05)",
            transition: "all 0.2s",
          }}
        >
          <Box
            component="img"
            src={bikeSDLogo}
            alt="BikeSd Logo"
            sx={{
              height: 60,
              width: "auto",
              display: "block",
              borderRadius: 0.5,
            }}
          />
        </ButtonBase>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
