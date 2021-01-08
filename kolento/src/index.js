import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './test'
import Kolento from './kolento'
import {HashRouter as Router,Link,Route} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="nav-box">
        导航：
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/test">测试页面</Link></li>
          <li><Link to="/kolento">kolento页面</Link></li>
        </ul>
      </div>
      <Route path="/" exact>
        <App name="kolentooooo"  />
      </Route>
      <Route path="/test" component={Test}></Route>
      <Route path="/kolento" component={Kolento}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
