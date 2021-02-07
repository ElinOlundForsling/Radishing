import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './stylesheets/style.css';
import './stylesheets/gallery.css';
import './stylesheets/card.css';
import './stylesheets/navbar.css';
import './stylesheets/product.css';
import './stylesheets/spinner.css';
import './stylesheets/alert.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
