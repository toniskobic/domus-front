import { Helmet } from 'react-helmet';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from 'src/store/app_context';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import AdTypeListResults from '../components/adTypes/AdTypeListResults'
import AdTypesToolbar from '../components/adTypes/AdTypesToolbar';

const AdTypes = (props) => {
  const navigate = useNavigate();
  const { state, dispatchStore } = useContext(appContext);

  useEffect(() => {
    if(localStorage.getItem('role') !== 'Admin') {
      navigate('/events', { replace: true });
    }
    const fetchAdTypes = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspAdTypes = await axios.get(
        'http://localhost:5000/api/ad-types',
        config
      );

      const fetchedAdTypes = await rspAdTypes.data;

      dispatchStore({
        type: 'CHANGE_AD_TYPES',
        payload: {adTypes: fetchedAdTypes}
      });

    };
    fetchAdTypes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Tipovi oglasa</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <AdTypesToolbar />
          <Box sx={{ pt: 3 }}>
            <AdTypeListResults adTypeList={state.adTypes} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AdTypes;
