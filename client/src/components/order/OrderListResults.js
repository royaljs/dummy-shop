import { useState, useContext } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ThemeProvider
} from '@material-ui/core';
import OrderClient from '../../services/OrderService';
import { createTheme } from '@material-ui/core/styles';
import { StoreContext } from '../../stores/RootStore';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5664d2'
    },
    secondary: {
      main: '#8bc34a'
    }
  }
});

const OrderListResults = ({ orders, ...rest }) => {
  const { orderStore } = useContext(StoreContext);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedOrderIds;

    if (event.target.checked) {
      newSelectedOrderIds = orders.map((order) => order.id);
    } else {
      newSelectedOrderIds = [];
    }

    setSelectedOrderIds(newSelectedOrderIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrderIds.indexOf(id);
    let newSelectedOrderIds = [];

    if (selectedIndex === -1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds, id);
    } else if (selectedIndex === 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(1)
      );
    } else if (selectedIndex === selectedOrderIds.length - 1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, selectedIndex),
        selectedOrderIds.slice(selectedIndex + 1)
      );
    }

    setSelectedOrderIds(newSelectedOrderIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedOrderIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedOrderIds.length > 0 &&
                      selectedOrderIds.length < orders.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>주문 시각</TableCell>
                <TableCell>주문 번호</TableCell>
                <TableCell>좌석 번호</TableCell>
                <TableCell>주문자 (WAPL Pay ID)</TableCell>
                <TableCell>주문 승인 상태</TableCell>
                <TableCell>주문 처리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * limit, page * limit + limit)
                .map((order) => (
                  <TableRow
                    hover
                    key={order.id}
                    selected={selectedOrderIds.indexOf(order.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedOrderIds.indexOf(order.id) !== -1}
                        onChange={(event) => handleSelectOne(event, order.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {order.created_at}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{}좌석번호</TableCell>
                    <TableCell>{order.user_id}</TableCell>
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
                    <TableCell>
                      <Button
                        style={{
                          backgroundColor: '#357a38',
                          color: 'white',
                          marginRight: '10px'
                        }}
                        onClick={() => {
                          OrderClient.approveOrder(
                            '12950ae2-767b-4671-81fa-09159349918e',
                            order.id
                          ).then((res) => {
                            orderStore.getOrder(order.id);
                          });
                        }}
                      >
                        주문 승인
                      </Button>
                      <Button
                        style={{ backgroundColor: '#f44336', color: 'white' }}
                        onClick={() => {
                          OrderClient.declineOrder(
                            '12950ae2-767b-4671-81fa-09159349918e',
                            order.id
                          ).then((res) => {
                            orderStore.getOrder(order.id);
                          });
                        }}
                      >
                        주문 거절
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="TableCell"
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </ThemeProvider>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array.isRequired
};

export default observer(OrderListResults);
