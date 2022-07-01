import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Button, Card, Chip, ThemeProvider } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { createTheme } from '@material-ui/core/styles';
import { StoreContext } from '../../stores/RootStore';
import OrderClient from '../../services/OrderService';

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

const useStyles = makeStyles({
  //DataGrid cell 클릭시 outline 생기지 않도록 설정
  root: {
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none'
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
      outline: 'none'
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderCheckbox:focus': {
      outline: 'none'
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
    //setLimit(event.target.value); //Table 전용
    setLimit(event.pageSize); //DataGrid 전용
    setPage(0);
  };

  const handlePageChange = (event) => {
    setPage(event.page);
  };

  const columns = [
    {
      field: 'created_at',
      headerName: '주문 시각',
      description: 'Dummy Shop에 주문이 들어온 시각입니다.',
      width: 200
    },
    {
      field: 'id',
      headerName: '주문 번호',
      description: 'Dummy Shop에 요청된 주문 고유번호 입니다.',
      width: 150
    },
    {
      field: 'id1',
      headerName: '좌석 번호',
      description: 'Dummy Shop 매장에 서빙할 좌석 번호입니다.',
      width: 150
    },
    {
      field: 'user_id',
      headerName: '주문자 ID',
      description: 'Dummy Shop에 주문한 고객의 고유번호 입니다.',
      width: 250
    },
    {
      field: 'status',
      headerName: '주문 승인 상태',
      description: '주문의 승인 상태를 나타냅니다.',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const order = params.row;
        return (
          <>
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
          </>
        );
      }
    },
    {
      field: 'status1',
      headerName: '주문 처리',
      description: '버튼을 눌러 주문에 대한 승인/거절 처리를 할 수 있습니다.',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const order = params.row;
        return (
          <>
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
          </>
        );
      }
    }
  ];

  //DataGrid 사용을 위해 orderStore의 주문 목록을 rows에 feed
  let rows = [];
  orders.map((order) => {
    rows.push(order);
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050, height: 650 }}>
            <DataGrid
              className={classes.root}
              rows={rows}
              columns={columns}
              page={page}
              checkboxSelection
              disableSelectionOnClick
              pagination
              pageSize={limit}
              rowsPerPageOptions={[10, 20, 50]}
              onPageSizeChange={handleLimitChange}
              onPageChange={handlePageChange}
              sortModel={[
                {
                  field: 'created_at',
                  sort: 'desc'
                }
              ]}
            />
          </Box>
        </PerfectScrollbar>
      </Card>
    </ThemeProvider>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array.isRequired
};

export default observer(OrderListResults);
