import React from 'react';
import PropTypes from 'prop-types';

export default function RepeatRequestButton({ error, onClick: handler }) {

  return (
    <div className='text-center'>
      {error && <p>Ошибка! Не удалось загрузить данные.</p>}
      <button className='btn btn-outline-primary' onClick={handler}>Повторить запрос</button>
    </div>
  );
}

RepeatRequestButton.propTypes = {
  error: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};