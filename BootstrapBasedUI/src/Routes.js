import React from 'react';
import { Route, Switch,withRouter, Redirect } from 'react-router-dom';
import SubFolder from './Components/Search';
import RootFolder from './Components/RootFolder';
import { TransitionGroup,CSSTransition } from "react-transition-group";

const RouterOutlet = (props) => {
  return (
    <TransitionGroup>
    <CSSTransition key={props.location.key} classNames="page" timeout={500}>
    <Switch>
      <Redirect from='/' to='/mydrive' exact/>
      <Route path="/mydrive" exact component={RootFolder} />
      <Route path='/folder/:id' exact component={RootFolder}/>
      <Route path='/search/:name' exact component={SubFolder}/>

    </Switch>
    </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter( RouterOutlet);
