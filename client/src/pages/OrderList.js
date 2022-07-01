import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import OrderListResults from 'src/components/order/OrderListResults';
import OrderListToolbar from 'src/components/order/OrderListToolbar';
import { useContext } from 'react'
import { observer } from 'mobx-react';
import { StoreContext } from '../stores/RootStore';

const OrderList = () => {
  const { orderStore } = useContext(StoreContext);
  return (
    <>
      <Helmet>
        <title>Orders | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <OrderListToolbar />
          <Box sx={{ pt: 3 }}>
            <OrderListResults orders={orderStore.orderList} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default observer(OrderList);
