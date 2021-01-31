import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  IconButton,
} from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ICheckedOutProduct, IState } from '../interface';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      backgroundColor: '#DC1928',
    },
    headerText: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: 24,
      fontWeight: 600,
      color: '#FFFFFF',
      textAlign: 'center',
      flex: 1,
    },
  }),
);

const Header: React.FC = (props: any) => {
  const { header, headerText } = useStyles();
  const countBy = (shoppingCart: ICheckedOutProduct[]) => {
    return shoppingCart.reduce((count: number, checkedOutProduct: ICheckedOutProduct) => {
      count += checkedOutProduct['count'];
      return count;
    }, 0);
  };

  const count = useSelector((state: IState) => countBy(state.selectedProductsState.shoppingCart));

  const routeToProductsPage = () => {
    props.history.push('/products');
  };

  const routeToCheckOutPage = () => {
    props.history.push('/checkout');
  };

  return (
    <header>
      <AppBar position="static" className={header}>
        <Toolbar>
          <IconButton onClick={routeToProductsPage}>
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography className={headerText}>Welcome to Product Cart</Typography>
          <Badge
            badgeContent={count}
            color="primary"
            overlap="circle"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <IconButton onClick={routeToCheckOutPage}>
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default withRouter(Header);
