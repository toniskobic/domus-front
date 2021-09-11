import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, Button } from '@material-ui/core';

const OptionsToolbar = ({ ...props }) => {
  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card sx={{ overflow: 'auto' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box m={1}>
                <RouterLink to="eventtypes">
                  <Button color="primary" variant="contained">
                    Tipovi događaja
                  </Button>
                </RouterLink>
              </Box>
              <Box m={1}>
                <RouterLink to="adtypes">
                  <Button color="primary" variant="contained">
                    Tipovi oglasa
                  </Button>
                </RouterLink>
              </Box>
              <Box m={1}>
                <RouterLink to="dormitories">
                  <Button color="primary" variant="contained">
                    Studentski domovi
                  </Button>
                </RouterLink>
              </Box>
              <Box m={1}>
                <RouterLink to="cities">
                  <Button color="primary" variant="contained">
                    Gradovi
                  </Button>
                </RouterLink>
              </Box>
              <Box m={1}>
                <RouterLink to="users">
                  <Button color="primary" variant="contained">
                    Korisnici
                  </Button>
                </RouterLink>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

OptionsToolbar.propTypes = {
  input: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  eventTypeList: PropTypes.array.isRequired
};

export default OptionsToolbar;
