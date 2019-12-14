import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'


function App() {
  return (
    <Router>
      {/* 重定向 */}
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={ Home }/>
      <Route path="/citylist" component={ CityList } /> 
    </Router>    
  );
}

export default App;
