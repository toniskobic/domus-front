import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EventsToolbar from 'src/components/events/EventsToolbar';

const Events = () => (
  <>
    <Helmet>
      <title>Domus</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <EventsToolbar />
      </Container>
    </Box>
  </>
);

export default Events;
