import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/donggeul.png',
  jobTitle: '지점장',
  name: '이지원'
};

const items = [
  {
    href: '/shop/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/shop/customers',
    icon: UsersIcon,
    title: '고객 관리'
  },
  {
    href: '/shop/products',
    icon: ShoppingBagIcon,
    title: '상품 관리'
  },
  {
    href: '/shop/orders',
    icon: ShoppingCartIcon,
    title: '주문 관리'
  },
  {
    href: '/shop/orders',
    icon: ShoppingBagIcon,
    title: '좌석 관리'
  },
  {
    href: '/shop/account',
    icon: UserIcon,
    title: '계정 관리'
  },
  {
    href: '/shop/settings',
    icon: SettingsIcon,
    title: '설정'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: '로그인'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Dummy Shop 회원 가입'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: '404 페이지'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
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
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/shop/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
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
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography align="center" gutterBottom variant="h4">
          DummyShop Github
        </Typography>
        <Typography align="center" variant="body2">
          docs와 소스코드 확인
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://github.com/royaljs/dummy-shop"
            variant="contained"
          >
            DummyShop Github
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Box display={{ lg: 'none' }}>
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
      </Box>
      <Box display={{ xs: 'none', lg: 'block' }}>
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
      </Box>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
