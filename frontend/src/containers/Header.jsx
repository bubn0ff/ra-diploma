import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/header-logo.png';
import HeaderSearchCart from '../components/HeaderSearchCart';

export default function Header() {
  const links = [
    { url: '/', title: 'Главная' },
    { url: '/catalog', title: 'Каталог' },
    { url: '/about', title: 'О магазине' },
    { url: '/contacts', title: 'Контакты' }
  ];

  return (
    <header className='container'>
      <div className='row'>
        <div className='col'>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            
            <NavLink to='/' className='navbar-brand'>
              <img src={logo} alt='Bosa Noga' />
            </NavLink>

            <div className='collapase navbar-collapse' id='navbarMain'>
              
              <ul className='navbar-nav mr-auto'>
                {links.map(({ url, title }) => (
                  <li key={url} className='nav-item'>
                    <NavLink to={url} className='nav-link' activeClassName='active'>{title}</NavLink>
                  </li>
                ))}
              </ul>

              <HeaderSearchCart />

            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}