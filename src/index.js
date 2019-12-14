import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
import './index.scss';
import Mock from './mocks/mock'
Mock.start()

ReactDOM.render(<App />, document.getElementById('root'));
