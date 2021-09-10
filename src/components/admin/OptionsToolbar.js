import PropTypes from 'prop-types';

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
                <Button color="primary" variant="contained">
                  Tipovi događaja
                </Button>
              </Box>
              <Box m={1}>
                <Button color="primary" variant="contained">
                  Tipovi oglasa
                </Button>
              </Box>
              <Box m={1}>
                <Button color="primary" variant="contained">
                  Korisnici
                </Button>
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
