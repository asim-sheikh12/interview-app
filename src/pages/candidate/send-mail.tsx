import { Box, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import type { ReactNode } from 'react';

import { Register } from '@/components';
import { DashboardLayout } from '@/containers';

const Page = () => {
  return (
    <>
      <Head>
        <title>Send E-mail | Candidate</title>
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
            Send Email to Candidate
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={8} md={6} xs={12}>
              <Register />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
