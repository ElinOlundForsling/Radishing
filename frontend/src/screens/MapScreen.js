import React from 'react';

const MapScreen = () => {
  return (
    <article>
      <div className='centered-content'>
        <h2>Hitta hit</h2>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2043.3185819908388!2d17.892037816063063!3d59.1939714816117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f71baf48a29df%3A0x414b0822db07db4c!2sTorvan%20Tr%C3%A4dg%C3%A5rdshandel!5e0!3m2!1sen!2sse!4v1612862441019!5m2!1sen!2sse'
          width='600'
          height='450'
          frameborder='0'
          style={{ border: 0 }}
          allowfullscreen=''
          aria-hidden='false'
          tabindex='0'></iframe>
        <p>Torvan Trädgårdshandel Rikstensvägen 31, 146 38 Tullinge</p>
      </div>
    </article>
  );
};

export default MapScreen;
