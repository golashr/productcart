import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IProduct, IProductProp } from '../interface';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions';

const useStyles = makeStyles({
  root: {
    margin: 20,
    backgroundColor: yellow[100],
    maxWidth: 400,
    minWidth: 400,
  },
  cardText: {
    color: '#212129',
  },
  media: {
    maxHeight: 300,
    minHeight: 290,
  },
});

function ProductCard(product: IProductProp) {
  const classes = useStyles();
  const { id, name, price, img }: IProduct = product.product;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product.product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.product));
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} component="img" alt={name} image={img} title={name} />
        <CardContent className={classes.cardText}>
          <Typography gutterBottom variant="h5" component="h2">
            <strong>Name</strong> - {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            <strong>Id</strong> - {id}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            <strong>Price</strong> - {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleAddToCart} size="small" color="primary">
          Add to Cart
        </Button>
        <Button onClick={handleRemoveFromCart} size="small" color="primary">
          Remove from Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
