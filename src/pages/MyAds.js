/* eslint-disable no-bitwise */
/* eslint-disable eqeqeq */
import { Helmet } from 'react-helmet';
import { useEffect, useState, useContext } from 'react';
import appContext from 'src/store/app_context';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import MyAdsToolbar from 'src/components/myAds/MyAdsToolbar';
import MyAdListResults from 'src/components/myAds/MyAdListResults';

const MyAds = () => {
  const { state, dispatchStore } = useContext(appContext);
  const [input, setInput] = useState(0);
  const [adTypeList, setAdTypeList] = useState([]);

  const updateInput = async (value) => {
    const filtered = state.ads.filter(
      (ad) => ad.adTypeId === value
    );
    let filteredAds = value == 0 ? state.ads : filtered;

    dispatchStore({
      type: 'FILTER_ADS',
      payload: {filteredAds}
    });
    setInput(value);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspAds = await axios.get(
        'http://localhost:5000/api/ads',
        config
      );

      const rspAdTypes = await axios.get(
        'http://localhost:5000/api/ad-types',
        config
      );

      const fetcheddAds = await rspAds.data;
      const fetchedAdTypes = await rspAdTypes.data;
      const filteredAds = fetcheddAds.filter(
        (el) => (el.userId == localStorage.getItem('id'))
      );

      setAdTypeList(fetchedAdTypes);

      dispatchStore({
        type: 'CHANGE_ADS',
        payload: {ads: filteredAds}
      });
      
      dispatchStore({
        type: 'FILTER_ADS',
        payload: {filteredAds: filteredAds}
      });
    };
    fetchEvents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Oglasi</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <MyAdsToolbar input={input} onChange={updateInput} adTypeList={adTypeList} />
          <Box sx={{ pt: 3 }}>
            <MyAdListResults
              adList={state.filteredAds}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MyAds;
