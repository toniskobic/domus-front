/* eslint-disable no-bitwise */
/* eslint-disable eqeqeq */
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import AdsToolbar from 'src/components/ads/AdsToolbar';
import AdListResults from 'src/components/ads/AdListResults';

const Ads = () => {
  const [input, setInput] = useState(0);
  const [adList, setAdList] = useState([]);
  const [adListDefault, setAdListDefault] = useState([]);
  const [adTypeList, setAdTypeList] = useState([]);

  const updateInput = async (value) => {
    if (value == 0) {
      setInput(value);
      setAdList(adListDefault);
    } else {
      const filtered = adListDefault.filter(
        (ad) => ad.adTypeId == value
      );

      setInput(value);
      setAdList(filtered);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspAds = await axios.get(
        'https://***REMOVED***/domus/api/ad',
        config
      );

      const rspAdTypes = await axios.get(
        'https://***REMOVED***/domus/api/adType',
        config
      );

      const fetcheddAds = await rspAds.data;
      const fetchedAdTypes = await rspAdTypes.data;
      const filteredAds = fetcheddAds.filter(
        (el) => (el.userId !== localStorage.getItem('id'))
      );

      setAdList(filteredAds);
      setAdListDefault(filteredAds);
      setAdTypeList(fetchedAdTypes);
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
          <AdsToolbar input={input} onChange={updateInput} adTypeList={adTypeList} />
          <Box sx={{ pt: 3 }}>
            <AdListResults
              adList={adList}
              adTypeList={adTypeList}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Ads;
