import React from 'react';
import styles from './NotFoundBlock.module.scss'
const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1 >
        <span>😫</span>
        <br/>
        Not Found .... :( </h1>
      <p className={styles.description}>Oops. It seems that the page you are looking for is missing or unavailable on our website</p>
    </div>
  );
};

export default NotFoundBlock;