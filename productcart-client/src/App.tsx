import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Products from './components/Products';
import Checkout from './components/Checkout';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { ROUTES } from './constants';

const App: React.FC = () => {
  const redirect = () => <Redirect to={ROUTES.PRODUCTS} />;
  return (
    <>
      <Header />
      <Switch>
        <Route exact={true} path="/" render={redirect} />
        <Route exact={true} path={ROUTES.PRODUCTS} component={Products} />
        <Route exact={true} path={ROUTES.CHECKOUT} component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
