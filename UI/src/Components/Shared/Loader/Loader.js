import React from 'react';
import classes from './Loader.module.css';

const Loader = ({ show = false }) =>
  show ? (
    <>
      <div className={classes.container}>
      <div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>     </div>
    </>
  ) : null;

export default Loader;
