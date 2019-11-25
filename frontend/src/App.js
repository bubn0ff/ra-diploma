import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Footer, Container, Contacts } from './components';
import { Catalog, Product, About, Home, Cart, NotFound } from './components';

export default function App() {
  
  return (
    <>
      <Header />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/about' component={About} />
          <Route exact path='/catalog/:id' component={Product} />
          <Route exact path='/catalog' component={Catalog} />
          <Route exact path='/contacts' component={Contacts} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}