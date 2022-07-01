import { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StoreContext } from '../../stores/RootStore';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LatestProducts = (props) => {
  const { productStore } = useContext(StoreContext);

  useEffect(async () => {
    productStore.initialize();
    console.log(productStore.productList);
  }, [productStore]);
  const navigate = useNavigate();

  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${productStore?.productList?.length} in total`}
        title="최근 등록 상품"
      />
      <Divider />
      <List>
        {productStore?.productList?.map((product, i) => (
          <ListItem
            divider={i < productStore?.productList?.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.image_urls[0]}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              // secondary={`Updated ${product.updatedAt.fromNow()}`}
            />
            <IconButton edge="end" size="small">
              <MoreVertIcon
                onClick={() => alert('TODO: action List 추가하기')}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
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
          onClick={() => navigate('/shop/products', { replace: true })}
        >
          모두 보기
        </Button>
      </Box>
    </Card>
  );
};

export default observer(LatestProducts);
