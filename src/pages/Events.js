/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import EventsToolbar from 'src/components/events/EventsToolbar';
import EventListResults from 'src/components/events/EventListResults';

const Events = (props) => {
  const [input, setInput] = useState(0);
  const [eventList, setEventList] = useState([]);
  const [eventListDefault, setEventListDefault] = useState([]);
  const [eventTypeList, setEventTypeList] = useState([]);

  const updateInput = async (value) => {
    if (value == 0) {
      setInput(value);
      setEventList(eventListDefault);
    } else {
      const filtered = eventListDefault.filter(
        (event) => event.eventTypeId == value
      );

      setInput(value);
      setEventList(filtered);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspEvents = await axios.get(
        'https://***REMOVED***/domus/api/event',
        config
      );

      const rspEventTypes = await axios.get(
        'https://***REMOVED***/domus/api/eventType',
        config
      );

      const fetchedEvents = await rspEvents.data;
      const fetchedEventTypes = await rspEventTypes.data;
      const filteredEvents = fetchedEvents.filter(
        (el) => (el.dormitoryId == localStorage.getItem('dormitoryId'))
        & (el.userId !== localStorage.getItem('id'))
      );

      setEventList(filteredEvents);
      setEventListDefault(filteredEvents);
      setEventTypeList(fetchedEventTypes);
    };
    fetchEvents();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Događaji</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <EventsToolbar input={input} onChange={updateInput} eventTypeList={eventTypeList} />
          <Box sx={{ pt: 3 }}>
            <EventListResults
              eventList={eventList}
              eventTypeList={eventTypeList}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Events;
