import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getCookie } from 'cookies-next';
import type { ReactNode } from 'react';
import { useContext, useEffect } from 'react';

import { AuthContext } from '@/contexts/auth-context';
import { getRecruiterById } from '@/services';
import { AppConfig } from '@/utils';

import { DashboardNavbar } from '../DashboardNavbar';
import { DashboardSidebar } from '../Sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

interface IProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: IProps) => {
  const userId = getCookie(AppConfig.userId);
  const { userData, setUserData } = useContext(AuthContext);
  const getUserDetails = async () => {
    if (userId) {
      const result = await getRecruiterById(userId as string);
      setUserData(result?.data);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar />
      <DashboardSidebar
        userData={userData}
        // onClose={() => setSidebarOpen(false)}
        // open={isSidebarOpen}
      />
    </>
  );
};
