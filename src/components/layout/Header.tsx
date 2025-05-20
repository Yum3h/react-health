import React from 'react';
import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7, Translate } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import GJULogoImg from "../../assets/logos/GJU-LOGO.png";
import SAHSSLogoImg from "../../assets/logos/SAHSS-LOGO.png";

interface HeaderProps {
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  isDarkMode: boolean;
  isArabic: boolean;
}

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
});

const LogoLink = styled('a')({
  textDecoration: 'none',
  display: 'block',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
});

const GJULogo = styled('img')(({ theme }) => ({
  height: 80,
  transition: 'all 0.3s ease',
  filter: theme.palette.mode === 'light' ? 'brightness(0.7) contrast(1.2)' : 'none',
}));

const SAHSSLogo = styled('img')(({ theme }) => ({
  height: 60,
  transition: 'all 0.3s ease',
  filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
}));

const Header: React.FC<HeaderProps> = ({
  onThemeToggle,
  onLanguageToggle,
  isDarkMode,
}) => {
  return (
    <Box sx={{ 
      px: 3, 
      py: 2,
      background: (theme) => theme.palette.mode === 'dark' 
        ? 'linear-gradient(45deg, #2c3e50 30%, #34495e 90%)'
        : 'linear-gradient(45deg, #3498db 30%, #2980b9 90%)',
      boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
      borderRadius: '0 0 16px 16px',
      color: 'white',
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left: GJU + SAHSS Logos */}
        <LogoContainer>
          <LogoLink href="https://www.gju.edu.jo/" target="_blank" rel="noopener noreferrer">
            <GJULogo
              src={GJULogoImg}
              alt="GJU Logo"
            />
          </LogoLink>
          <LogoLink href="https://www.gju.edu.jo/content/about-sahss-900" target="_blank" rel="noopener noreferrer">
            <SAHSSLogo
              src={SAHSSLogoImg}
              alt="SAHSS Logo"
            />
          </LogoLink>
        </LogoContainer>

        {/* Right: Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            onClick={onThemeToggle} 
            color="inherit"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton 
            onClick={onLanguageToggle} 
            color="inherit"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <Translate />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
