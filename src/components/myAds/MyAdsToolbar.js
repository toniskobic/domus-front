import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem
} from '@material-ui/core';

const MyAdsToolbar = ({
  input, onChange, adTypeList, ...props
}) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <RouterLink to="new">
        <Button color="primary" variant="contained">
          Novi oglas
        </Button>
      </RouterLink>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              select
              fullWidth
              label="Tip oglasa"
              margin="normal"
              variant="outlined"
              value={input}
              onChange={(e) => onChange(e.target.value)}
            >
              <MenuItem key={0} value={0}>
                Svi
              </MenuItem>
              {adTypeList.map((option) => (
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

MyAdsToolbar.propTypes = {
  input: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  adTypeList: PropTypes.array.isRequired
};

export default MyAdsToolbar;
