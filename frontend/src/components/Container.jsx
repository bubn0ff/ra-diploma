import React from 'react';
import banner from '../img/banner.jpg';

// Контейнер для контента между шапкой и подвалом
export default function Container ({ children }) {

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}