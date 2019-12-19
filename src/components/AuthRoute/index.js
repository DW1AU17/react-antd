import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../../utils'

// 包裹需要登录才能访问的页面

// 1. 返回一个 Route 组件
// 2. 通过 render-prop模式
// 3. 判断是否登录
// 4. 登录：  跳转当前页面
// 5. 未登录：跳转登录页面  / 并在路由中添加参数


const AuthRoute = ({ component:　Component, ...argument}) => {
  return (
    <Route 
      {...argument}
      render = { props => {   // props存的是当前路由信息
        if ( isLogin() ) {
          return <Component {...props} />
        } else {
          return (
            <Redirect  
              to={{
                pathname: '/login',
                state: {form: props.location.pathname}    // 传递额外数据， 指定登录成后的返回页面
              }}
            />
          )
        }
      }}    
    />
  )
}

export default AuthRoute