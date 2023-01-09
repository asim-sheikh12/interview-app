import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import type { CSSObject, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { UserRole } from '@/constants';
import type { IRecruiter } from '@/interfaces';
import Header from '@/layouts/Header';

import { NavItem } from '../NavItem';

interface IProps {
  userData: IRecruiter | undefined;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const DashboardSidebar = ({ userData }: IProps) => {
  const items =
    userData?.role && userData?.role === UserRole.ADMIN
      ? [
          {
            href: '/recruiter/list',
            icon: <PeopleIcon fontSize="small" />,
            title: 'Recruiter List',
          },
          {
            href: '/recruiter',
            icon: <PersonAddAlt1Icon fontSize="small" />,
            title: 'Add Recruiter',
          },

          {
            href: '/settings',
            icon: <SettingsIcon fontSize="small" />,
            title: 'Settings',
          },
        ]
      : [
          {
            href: '/candidate/list',
            icon: <PeopleIcon fontSize="small" />,
            title: 'Candidate List',
          },
          {
            href: '/candidate',
            icon: <PersonAddAlt1Icon fontSize="small" />,
            title: 'Add Candidate',
          },

          {
            href: '/settings',
            icon: <SettingsIcon fontSize="small" />,
            title: 'Settings',
          },
        ];
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Drawer variant="permanent" open={true}>
        <DrawerHeader>
          {/* <IconButton>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider />
      </Drawer>
    </Box>
  );
};
