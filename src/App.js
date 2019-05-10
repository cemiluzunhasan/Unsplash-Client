import React from 'react';
import './assets/main.scss';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          { routes.map((route, key) => (
            <Route key={key} path={route.path} component={route.component} exact={route.exact} />
          ))}
          <Redirect from="/" to="/search" />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
