import { Helmet } from 'react-helmet';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from 'src/store/app_context';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import EventTypeListResults from '../components/eventTypes/EventTypeListResults';
import EventTypesToolbar from '../components/eventTypes/EventTypesToolbar';

const EventTypes = (props) => {
  const navigate = useNavigate();
  const { state, dispatchStore } = useContext(appContext);

  useEffect(() => {
    if (localStorage.getItem('role') !== 'Admin') {
      navigate('/events', { replace: true });
    }
    const fetchEventTypes = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspEventTypes = await axios.get(
        'http://localhost:5000/api/event-types',
        config
      );

      const fetchedEventTypes = await rspEventTypes.data;

      dispatchStore({
        type: 'CHANGE_EVENT_TYPES',
        payload: { eventTypes: fetchedEventTypes }
      });
    };
    fetchEventTypes();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Tipovi događaja</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <EventTypesToolbar />
          <Box sx={{ pt: 3 }}>
            <EventTypeListResults eventTypeList={state.eventTypes} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EventTypes;
