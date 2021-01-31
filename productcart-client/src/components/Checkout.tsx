import React, { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { PromotionCodes } from '../data/promotionCodes';
import { ICheckedOutProduct, IState, ICheckedOutCart } from '../interface';
import { checkoutRequest } from '../actions';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#dc1928',
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 400,
  },
  radioBoxLabel: {
    fontSize: theme.typography.fontSize,
    fontWeight: 600,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 1, 0, 0),
  },
  headerText: {
    fontSize: theme.typography.fontSize,
    fontWeight: 600,
  },
}));

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedPromotionCode, setPromotionCode] = React.useState('none');
  const classes = useStyles();

  const shoppingCart: ICheckedOutProduct[] = useSelector(
    (state: IState) => state.selectedProductsState.shoppingCart,
  );

  const checkOutPrice: number = useSelector(
    (state: IState) => state.checkOutPriceState.checkOutPrice,
  );

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();
    let payLoad: ICheckedOutCart = {
      checkedOutProducts: shoppingCart,
      promotionCode: '',
    };
    switch (selectedPromotionCode) {
      case 'RRD4D32':
        payLoad.promotionCode = 'RRD4D32';
        break;
      case '44F4T11':
        payLoad.promotionCode = '44F4T11';
        break;
      case 'FF9543D1':
        payLoad.promotionCode = 'FF9543D1';
        break;
      case 'YYGWKJD':
        payLoad.promotionCode = 'YYGWKJD';
        break;
      default:
        payLoad.promotionCode = '';
        break;
    }
    dispatch(checkoutRequest(payLoad));
  };

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromotionCode(event.target.value);
  };
  return (
    <Grid item container>
      <Grid item xs={false} sm={2} />
      <Grid item xs={12} sm={8}>
        <Box m={6} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>PRODUCT ID</StyledTableCell>
                <StyledTableCell align="right">PRODUCT PRICE</StyledTableCell>
                <StyledTableCell align="right">COUNT</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shoppingCart.map((product: ICheckedOutProduct) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell align="left">{product.id}</StyledTableCell>
                  <StyledTableCell align="right">{product.price}</StyledTableCell>
                  <StyledTableCell align="right">{product.count}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box m={6} />
        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
          <FormControl component="fieldset">
            <FormLabel component="legend">Promotion Code</FormLabel>
            <RadioGroup
              aria-label="promotionCode"
              name="promotionCode"
              onChange={onRadioChange}
              value={selectedPromotionCode}
            >
              <FormControlLabel
                className={classes.radioBoxLabel}
                value={'none'}
                control={<Radio />}
                label={`None - No Promotion code selected`}
              />
              <FormControlLabel
                className={classes.radioBoxLabel}
                value={PromotionCodes[0].code}
                control={<Radio />}
                label={`${PromotionCodes[0].code} - ${PromotionCodes[0].description}`}
              />
              <FormControlLabel
                className={classes.radioBoxLabel}
                value={PromotionCodes[1].code}
                control={<Radio />}
                label={`${PromotionCodes[1].code} - ${PromotionCodes[1].description}`}
              />
              <FormControlLabel
                className={classes.radioBoxLabel}
                value={PromotionCodes[2].code}
                control={<Radio />}
                label={`${PromotionCodes[2].code} - ${PromotionCodes[2].description}`}
              />
              <FormControlLabel
                className={classes.radioBoxLabel}
                value={PromotionCodes[3].code}
                control={<Radio />}
                label={`${PromotionCodes[3].code} - ${PromotionCodes[3].description}`}
              />
            </RadioGroup>
          </FormControl>
          <Box m={2} />
          <Typography className={classes.headerText}>Total : ${checkOutPrice}</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Calculate Total Cost
          </Button>
          {/* </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

export default Checkout;
