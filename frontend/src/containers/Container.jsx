import React from 'react';
import { Route, Switch } from 'react-router-dom';
import banner from '../img/banner.jpg';
import Home from '../components/Home';
import Cart from '../components/Cart';
import Product from '../components/Product';
import ToCatalog from '../components/ToCatalog';
import About from '../components/About';
import Contacts from '../components/Contacts';
import NotFound from '../components/NotFound';

// Контейнер для контента между шапкой и подвалом
export default function Container() {

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/about' component={About} />
            <Route exact path='/catalog/:id' component={Product} />
            <Route exact path='/catalog' component={ToCatalog} />
            <Route exact path='/contacts' component={Contacts} />
            <Route path='*' component={NotFound} />
          </Switch>

        </div>
      </div>
    </main>
  );
}