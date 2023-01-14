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
import type { SetStateAction } from 'react';
import { useContext } from 'react';

import { URL, UserRole } from '@/constants';
import { AuthContext } from '@/contexts/auth-context';
import type { IRecruiter } from '@/interfaces';

interface IProps {
  heading: string;
  setTableData: React.Dispatch<SetStateAction<IRecruiter[]>>;
  tableData: IRecruiter[];
}

export const Toolbar = ({ heading, setTableData, tableData }: IProps) => {
  const { userData } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = () => {
    if (userData?.role && userData?.role === UserRole.ADMIN) {
      router.push(URL.RECRUITER);
    } else {
      router.push(URL.SEND_EMAIL);
    }
  };

  const handleSearch = (value: string) => {
    const query = value?.trim();
    if (query.length >= 1) {
      const filterSuggestions = tableData?.filter((suggestion: IRecruiter) =>
        suggestion?.email?.toLowerCase().startsWith(query.toLowerCase())
      );
      setTableData(filterSuggestions);
    } else {
      setTableData(tableData);
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
            {userData?.role === UserRole.ADMIN ? 'Add Recruiter' : 'Send Email'}
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
