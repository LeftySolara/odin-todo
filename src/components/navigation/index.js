import React from 'react';
import { Link } from 'react-router-dom';

import styles from './navigation.module.css';

const Navigation = (props) => {
  const { links } = props;

  return (
    <div className={styles.navigation}>
      <ul className={styles['navigation-list']}>
        {links.map((link) => (
          <li className={styles['navigation-list-item']}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
