import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Login from './pages/Login'


function App() {
  return (
    <Router>
      {/* 重定向 */}
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={ Home }/>
      <Route path="/citylist" component={ CityList } /> 
      
      <Route path="/user/login" component={Login} />
    </Router>    
  );
}

export default App;
