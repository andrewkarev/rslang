import React from 'react';
import styles from './footer.module.css'
import logo from '../../assets/icons/rs_school_js.svg'


const Footer = () => {
  return(
    <div className={ styles["footer"]}>
      <div className={ styles["wrapper"]}>
        <div className={ styles["content"]}>
          <a>2022</a>
          <a href="https://rs.school/js/">
            <img className={ styles['logo']} src={logo} alt='logo'></img>
          </a>
          <a href='https://github.com/andrewkarev'>GitHub</a>
        </div>
      </div>
    </div>
  )
}

export default Footer;