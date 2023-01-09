import { Box, Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { Register, UploadPhoto } from '@/components';
import { DashboardLayout } from '@/containers';

const Page = () => {
  const [image, setImage] = useState<File | undefined>();
  return (
    <>
      <Head>
        <title>Add Recruiter</title>
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
            Add a New Candidate
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <UploadPhoto setImage={setImage} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Register image={image} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
