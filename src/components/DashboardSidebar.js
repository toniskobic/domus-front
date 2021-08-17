/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  // Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/events',
    icon: BarChartIcon,
    title: 'Događaji'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Korisnički račun'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Postavke'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Prijava'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Registracija'
  }
];

// eslint-disable-next-line react/prop-types
const DashboardSidebar = ({
  onMobileClose, openMobile, name, username
}) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography color="textPrimary" variant="h5">
          {username}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {name}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
