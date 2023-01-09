import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import type { ReactNode } from 'react';

import { ChangePassword } from '@/components';
import { DashboardLayout } from '@/containers';

const Page = () => (
  <>
    <Head>
      <title>Settings</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Settings
        </Typography>
        <Box sx={{ pt: 3 }}>
          <ChangePassword />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
