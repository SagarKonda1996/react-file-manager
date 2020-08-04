import React from 'react';
import classes from './Loader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loader = ({ show = false }) =>
  show ? (
    <>
      <div className={classes.container}>
        <FontAwesomeIcon icon={['fas', 'spinner']} size="5x" spin />
      </div>
    </>
  ) : null;

export default Loader;
