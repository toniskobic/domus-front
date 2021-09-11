import { Helmet } from 'react-helmet';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from 'src/store/app_context';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import DormitoryListResults from '../components/dormitories/DormitoryListResults';
import DormitoriesToolbar from '../components/dormitories/DormitoriesToolbar';

const Dormitories = (props) => {
  const navigate = useNavigate();
  const { state, dispatchStore } = useContext(appContext);

  useEffect(() => {
    if (localStorage.getItem('role') !== 'Admin') {
      navigate('/events', { replace: true });
    }
    const fetchDormitories = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspDormitories = await axios.get(
        'http://localhost:5000/api/dormitories',
        config
      );

      const fetchedDormitories = await rspDormitories.data;

      dispatchStore({
        type: 'CHANGE_DORMITORIES',
        payload: { dormitories: fetchedDormitories }
      });
    };
    fetchDormitories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Studentski domovi</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <DormitoriesToolbar />
          <Box sx={{ pt: 3 }}>
            <DormitoryListResults dormitoryList={state.dormitories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Dormitories;
