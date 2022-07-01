import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  ThemeProvider
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f2ede6'
    },
    secondary: {
      main: green[500]
    },
    pale: {
      main: '#FCF4D9',
      contrastText: '#383838'
    }
  }
});

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar elevation={0} {...rest}>
        <Toolbar>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />
          <Box display={{ xs: 'none', lg: 'block' }}>
            <IconButton
              color="inherit"
              onClick={() => alert('TODO: 주문 알림 기능 추가')}
            >
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => alert('TODO: 메뉴 리스트 추가')}
            >
              <InputIcon />
            </IconButton>
          </Box>
          <Box display={{ lg: 'none' }}>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
