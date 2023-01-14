import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import type { ReactNode } from 'react';

const Page = () => {
  return (
    <>
      <Head>
        <title>Add Details | Candidate</title>
      </Head>
      <Box component="main">
        <Typography>
          Congratulations ! You have sucessfully registered
        </Typography>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => page;

export default Page;
