import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Divider, ListItemText } from '@mui/material';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import * as React from 'react';

import { URL } from '@/constants';
import { AuthContext } from '@/contexts/auth-context';
import { AppConfig } from '@/utils';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DashboardNavbar = () => {
  const router = useRouter();
  const { userData } = React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = (): void => {
    deleteCookie(AppConfig.tokenKey);
    deleteCookie(AppConfig.userId);
    router.push(URL.Login);
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>{userData?.email || ''}</MenuItem>
      <Divider />
      <MenuItem sx={{ padding: '0px 40px' }} onClick={handleLogout}>
        <ListItemText
          style={{
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            padding: '8px 0px',
          }}
        >
          Logout
        </ListItemText>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        open={true}
        style={{ background: '#fff', height: 63 }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            // onClick={() => dispatch(handleToggle())}
            edge="start"
            sx={{
              color: 'black',
              marginRight: 5,
              ...(true && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginTop: 1.5 }}
          >
            {/* <Image
              alt="logoImg"
              src="https://thou ghtwin.com/assets/img/Logo.svg"
              width={100}
              height
            /> */}
            {/* Thoughtwin */}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}
          >
            <Typography sx={{ color: '#000' }}>{`${userData?.firstName || ''} ${
              userData?.lastName || ''
            }`}</Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: 'black' }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
        {/* {showProgressBar && <LinearIndeterminate />} */}
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
