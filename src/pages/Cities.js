import { Helmet } from 'react-helmet';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from 'src/store/app_context';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import CityListResults from '../components/cities/CityListResults';
import CitiesToolbar from '../components/cities/CitiesToolbar';

const Cities = (props) => {
  const navigate = useNavigate();
  const { state, dispatchStore } = useContext(appContext);

  useEffect(() => {
    if (localStorage.getItem('role') !== 'Admin') {
      navigate('/events', { replace: true });
    }
    const fetchCities = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspCities = await axios.get(
        'http://localhost:5000/api/cities',
        config
      );

      const fetchedCities = await rspCities.data;

      dispatchStore({
        type: 'CHANGE_CITIES',
        payload: { cities: fetchedCities }
      });
    };
    fetchCities();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Gradovi</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CitiesToolbar />
          <Box sx={{ pt: 3 }}>
            <CityListResults cityList={state.cities} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Cities;
