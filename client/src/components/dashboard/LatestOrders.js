import { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  ThemeProvider
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../stores/RootStore';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5664d2'
    },
    secondary: {
      main: '#4caf50'
    }
  }
});

const LatestOrders = (props) => {
  const { orderStore } = useContext(StoreContext);
  useEffect(async () => {
    orderStore.initialize();
    console.log(orderStore.orderList);
  }, [orderStore]);
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Card {...props}>
        <CardHeader title="최근 주문" />
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>주문 번호</TableCell>
                  <TableCell>고객</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        주문 일시
                      </TableSortLabel>
                    </Tooltip>
                </TableCell>
                <TableCell>주문 상태</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {orderStore.orderList.slice(0, 5).map((order, i) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user_id}</TableCell>
                    <TableCell>{order.created_at}</TableCell>
                    <TableCell>
                      <Chip
                        color={(() => {
                          if (order.status == 'pending') {
                            return 'primary';
                          } else if (order.status == 'approved') {
                            return 'secondary';
                          }
                        })()}
                        label={order.status}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
            onClick={() => navigate('/shop/orders', { replace: true })}
          >
            모두 보기
          </Button>
        </Box>
      </Card>
    </ThemeProvider>
  );
};
export default observer(LatestOrders);
