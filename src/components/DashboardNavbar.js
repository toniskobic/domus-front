import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

// eslint-disable-next-line react/prop-types
const DashboardNavbar = ({ onMobileNavOpen, logout, ...rest }) => (
  <AppBar elevation={0} {...rest}>
    <Toolbar>
      <RouterLink to="/">
        <Typography color="#FFFFFF" variant="h2">
          Domus
        </Typography>
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton color="inherit" onClick={logout}>
        <InputIcon />
      </IconButton>
      <Hidden lgUp>
        <IconButton color="inherit" onClick={onMobileNavOpen}>
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
);
DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
