import React from 'react';
import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() =>
  createStyles({
    headerText: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: 24,
      fontWeight: 600,
      color: '#dc1928',
      textAlign: 'center',
      flex: 1,
    },
  }),
);

const NotFound: React.FC = () => {
  const { headerText } = useStyles();
  return (
    <Grid item container>
      <Grid item xs={false} sm={2} />
      <Grid container direction="column" justify="center" alignItems="center">
        <Box m={6} />
        <Typography className={headerText}>
          Sorry, There is no route available with this name!!
        </Typography>
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

export default NotFound;
