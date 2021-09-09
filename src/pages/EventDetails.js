import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container } from '@material-ui/core';
import EventDetailsCard from 'src/components/eventDetails/EventDetailsCard';
import EventParticipants from 'src/components/eventDetails/EventParticipants';

const EventDetails = (props) => {
  const { id } = useParams();

  const [event, setEvent] = useState([]);

  useEffect( () =>{
    const fetchEvent = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const rspEvent = await axios.get(
        `http://localhost:5000/api/events/${id}`,
        config
      );

      const fetchedEvent = await rspEvent.data;

      setEvent(fetchedEvent);
    };
    fetchEvent();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domus | Događaj</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <EventDetailsCard fetchedEvent={event} />
          <Box sx={{ pt: 3 }}>
            <EventParticipants fetchedEvent={event} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EventDetails;
