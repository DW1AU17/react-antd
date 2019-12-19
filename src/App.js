import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Login from './pages/Login'
import AuthRoute from './components/AuthRoute'

function Detail() {
  return <div>这是需要登录的页面</div>
}

function App() {
  return (
    <Router>
      {/* 重定向 */}
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={ Home }/>
      <Route path="/citylist" component={ CityList } /> 
      
      <Route path="/login" component={Login} />
      {/* 需要登录控制的页面 */}
      <AuthRoute path="/detail" component={Detail} />
      
    </Router>    
  );
}

export default App;
