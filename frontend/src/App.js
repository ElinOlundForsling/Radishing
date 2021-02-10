import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AboutScreen from './screens/AboutScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import MapScreen from './screens/MapScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='main'>
        <Route path='/search/:keyword' component={HomeScreen} exact />
        <Route path='/page/:pageNumber' component={HomeScreen} exact />
        <Route
          path='/search/:keyword/page/:pageNumber'
          component={HomeScreen}
          exact
        />
        <Route path='/' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/profile' component={ProfileScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
        <Route path='/products/:id' component={ProductScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/shipping' component={ShippingScreen} exact />
        <Route path='/payment' component={PaymentScreen} exact />
        <Route path='/placeorder' component={PlaceOrderScreen} exact />
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/about' component={AboutScreen} exact />
        <Route path='/map' component={MapScreen} exact />
        <Route path='/privacy' component={PrivacyScreen} exact />
        <Route path='/admin/userlist' component={UserListScreen} exact />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
        <Route path='/admin/productlist' component={ProductListScreen} exact />
        <Route
          path='/admin/productlist/:pageNumber'
          component={ProductListScreen}
          exact
        />
        <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        <Route path='/admin/orderlist' component={OrderListScreen} />
      </main>

      <Footer />
    </Router>
  );
};

export default App;
