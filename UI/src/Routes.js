import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SubFolder from './Components/Search';
import RootFolder from './Components/RootFolder';
const RouterOutlet = () => {
  return (
    <Switch>
      <Route path="/" exact component={RootFolder} />
      <Route path='/:id' exact component={RootFolder}/>
      <Route path='/search/:name' exact component={SubFolder}/>

    </Switch>
  );
};

export default RouterOutlet;
