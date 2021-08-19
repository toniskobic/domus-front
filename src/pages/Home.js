import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Button
} from '@material-ui/core';

const Home = () => (
  <>
    <Helmet>
      <title>Domus | Početna</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={9}>
          <Grid item>
            <Typography align="center" color="textPrimary" variant="h1">
              Domus
            </Typography>
            <Typography align="center" color="textSecondary" variant="h3">
              Dobrodošli na Domus, aplikaciju koja studentima smještenim u
              studentskim domovima omogućava organiziranje događaja i
              postavljanje oglasa.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <RouterLink to="/register">
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="contained"
              >
                Registriraj se
              </Button>
            </RouterLink>
          </Grid>
          <Grid item xs={12} md={6}>
            <RouterLink to="/login">
              <Button fullWidth size="large" variant="contained">
                Prijavi se
              </Button>
            </RouterLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Home;
