import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './stylesheets/style.css';
import './stylesheets/gallery.css';
import './stylesheets/form.css';
import './stylesheets/card.css';
import './stylesheets/checkoutSteps.css';
import './stylesheets/footer.css';
import './stylesheets/navbar.css';
import './stylesheets/product.css';
import './stylesheets/cart.css';
import './stylesheets/placeorder.css';
import './stylesheets/profile.css';
import './stylesheets/spinner.css';
import './stylesheets/alert.css';
import './stylesheets/pagination.css';
import './stylesheets/admin.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
