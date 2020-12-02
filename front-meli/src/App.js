import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import SearchResult from './components/SearchResult';
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <main>
      <Router>
        <div>
          <Header />
        </div>
        <Switch>
          <Route exact path="/items" component={SearchResult}/>              
          <Route exact path="/items/:id" component={ProductDetail}/>              
        </Switch>
      </Router>
    </main>
  );
}

export default App;
