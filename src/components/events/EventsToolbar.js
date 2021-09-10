import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem
} from '@material-ui/core';

const EventsToolbar = ({ input, onChange, eventTypeList, ...props }) => {

  return (
    <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                select
                fullWidth
                label="Tip događaja"
                margin="normal"
                variant="outlined"
                value={input}
                onChange={(e) => onChange(e.target.value)}
              >
                <MenuItem key={0} value={0}>
                  Svi
                </MenuItem>
                {eventTypeList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

EventsToolbar.propTypes = {
  input: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  eventTypeList: PropTypes.array.isRequired
};

export default EventsToolbar;
