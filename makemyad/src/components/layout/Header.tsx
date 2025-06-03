import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from '@mui/material';
import {
  AccountCircle,
  Menu as MenuIcon,
  PostAdd,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/userSlice';

const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          MakeMyAd
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/ads')}>
            Browse Ads
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')}>
            About
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            Contact
          </Button>
        </Box>

        {isAuthenticated ? (
          <>
            <Button
              color="inherit"
              startIcon={<PostAdd />}
              sx={{ ml: 2 }}
              onClick={() => navigate('/ads/new')}
            >
              Post Ad
            </Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/my-ads'); }}>
                My Ads
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}

        <Menu
          id="mobile-menu"
          anchorEl={mobileMenuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(mobileMenuAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { handleClose(); navigate('/ads'); }}>
            Browse Ads
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); navigate('/about'); }}>
            About
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); navigate('/contact'); }}>
            Contact
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
