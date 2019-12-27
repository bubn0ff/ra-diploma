import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const links = [
    { url: '/about', title: 'О магазине' },
    { url: '/catalog', title: 'Каталог' },
    { url: '/contacts', title: 'Контакты' }
  ];

  return (
    <footer className='container bg-light footer'>
      <div className='row'>
        <div className='col'>
          <section>
            <h5>Информация</h5>

            <ul className='nav flex-column'>
              {links.map(({ url, title }) => (
                <li key={url} className='nav-item'>
                  <Link to={url} className='nav-link'>{title}</Link>
                </li>
              ))}
            </ul>
            
          </section>
        </div>
        <div className='col'>
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className='footer-pay'>
              <div className='footer-pay-systems footer-pay-systems-paypal' />
              <div className='footer-pay-systems footer-pay-systems-master-card' />
              <div className='footer-pay-systems footer-pay-systems-visa' />
              <div className='footer-pay-systems footer-pay-systems-yandex' />
              <div className='footer-pay-systems footer-pay-systems-webmoney' />
              <div className='footer-pay-systems footer-pay-systems-qiwi' />
            </div>
          </section>
          <section>
            <div className='footer-copyright'>
              2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров. 
              Все права защищены.<br/>Доставка по всей России!
            </div>
          </section>
        </div>
        <div className='col text-right'>
          <section className='footer-contacts'>
            <h5>Контакты:</h5>
            <a className='footer-contacts-phone' href='tel:+7-495-790-35-03'>+7 495 79 03 5 03</a>
            <span className='footer-contacts-working-hours'>Ежедневно: с 09-00 до 21-00</span>
            <a className='footer-contacts-email' href='mailto:office@bosanoga.ru'>office@bosanoga.ru</a>
            <div className='footer-social-links'>
              <div className='footer-social-link footer-social-link-twitter' />
              <div className='footer-social-link footer-social-link-vk' />
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}