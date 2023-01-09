import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { URL, UserRole } from '@/constants';
import { AuthContext } from '@/contexts/auth-context';

interface IProps {
  heading: string;
}

export const Toolbar = ({ heading }: IProps) => {
  const { userData } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = () => {
    if (userData?.role && userData?.role === UserRole.ADMIN) {
      router.push(URL.RECRUITER);
    } else {
      router.push(URL.CANDIDATE);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          {heading}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            onClick={() => handleClick()}
            color="primary"
            variant="contained"
          >
            {userData?.role === UserRole.ADMIN
              ? 'Add Recruiter'
              : 'Add Candidate'}
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
