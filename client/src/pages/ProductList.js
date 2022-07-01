import { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography
} from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import { observer } from 'mobx-react';
import { StoreContext } from '../stores/RootStore';

const ProductList = () => {
  const { productStore } = useContext(StoreContext);
  useEffect(() => {
    productStore.initialize();
    console.log(productStore.productList);
  }, [productStore]);
  let page = 1;
  return (
    <>
      <Helmet>
        <title>Products | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {productStore.productList.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Typography>Page: {page}</Typography>
            <Pagination
              color="primary"
              count={3}
              page={page}
              size="small"
              onChange={(event, page) => {
                //TODO: page 세팅
                alert(`${page} 페이지로 이동`);
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default observer(ProductList);
