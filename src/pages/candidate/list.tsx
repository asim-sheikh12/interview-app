import { Box, Container } from '@mui/material';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import type { ReactNode } from 'react';

import { CustomTable, Toolbar } from '@/components';
import { DashboardLayout } from '@/containers';
import type { IData, IRecruiter } from '@/interfaces';
import { getAllCandidates } from '@/services';

const Page = ({ data }: IData<IRecruiter>) => {
  return (
    <>
      <Head>
        <title>Candidates</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Toolbar heading="Candidate List" />
          <Box sx={{ mt: 3 }}>
            <CustomTable tableData={data} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const candidateData = await getAllCandidates(req);
  console.log({ candidateData });
  const { data } = candidateData;
  return {
    props: {
      data: data ?? [],
    },
  };
};
