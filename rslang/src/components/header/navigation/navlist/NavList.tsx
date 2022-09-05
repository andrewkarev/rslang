import { NavLink } from "react-router-dom";
import styles from './navlist.module.css';

type Props = {
  isOpened: boolean;
  toggleMenu: () => void;
}

const NavList: React.FC<Props> = (props) => {
  const navItems = [
    {
      name: 'Главная',
      url: '/',
    },
    {
      name: 'Учебник',
      url: '/textbook',
    },
    {
      name: 'Игры',
      url: '/games',
    },
    {
      name: 'Статистика',
      url: '/statistics',
    }
  ];

  const navElements = navItems.map((item) => {
    return (
      <li className={styles["nav-item"]} key={item.name} onClick={() => { props.toggleMenu() }}>
        <NavLink to={`${item.url}`}>{item.name}</NavLink>
      </li>
    );
  });

  return (
    <ul className={`${styles["nav-list"]} ${props.isOpened ? styles['active'] : ''}`}>
      {navElements}
      <div
        className={styles["close-burger-btn"]}
        onClick={props.toggleMenu}
      ></div>
    </ul>
  )
}

export default NavList;