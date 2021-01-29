import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import AboutScreen from './screens/AboutScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <div id='container'>
        <main>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/about' component={AboutScreen} exact />
        </main>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
