import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ReactNode } from 'react';

import { jwtService } from '@/backend/services/jwt.service';
import { RegisterCandidate } from '@/components';
import { icons } from '@/constants';
import { getCandidateByEmail } from '@/services';

const Page = () => {
  const isMobile = useMediaQuery('(min-width:768px)');
  return (
    <>
      <Head>
        <title>Add Details | Candidate</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundImage: isMobile ? `url(${icons.bgImage.src})` : '',
          backgroundSize: 'cover',
          height: '100vh',
          backgroundPosition: 'right',
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={7} md={6} xs={12}>
              <RegisterCandidate />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => page;

export default Page;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.query;
  const { req } = context;
  const result: any = await jwtService.verifyCandidateToken(token as string);
  if (!result) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
  if (result) {
    const response = await getCandidateByEmail(result.email as string, req);
    if (response?.status === 200) {
      return {
        redirect: {
          permanent: false,
          destination: '/candidate/register',
        },
        props: {},
      };
    }
  }
  return {
    props: {
      data: [],
    },
  };
};
