/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ProductCard from './ProductCard';
import { IProduct, IState } from '../interface';
import { fetchRemoteProductsRequest } from '../actions';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: IState) => {
    return Array.from(state.productCartState.products);
  });

  useEffect(() => {
    dispatch(fetchRemoteProductsRequest());
  }, []);

  return (
    <Grid item container>
      <Grid item xs={false} sm={2} />
      <Grid item xs={12} sm={8}>
        <Box m={6} />
        <Grid item container justify="center" alignItems="flex-start">
          {products && products.map((product: IProduct) => <ProductCard product={product} />)}
        </Grid>
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

export default Products;
