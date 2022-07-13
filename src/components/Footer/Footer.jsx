import React, { useState } from 'react';
import Contact from '../Contact/Contact';
import Modal from '../Modals/Modal/Modal.jsx';
import s from '../Footer/Footer.module.css'
import { Link } from "react-router-dom";


export default function Footer() {

  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  }

  return (
    <div className={s.containerFooter}>
      <div className={s.info}>
        {/* column1 */}
        
          <h4 onClick={toggle} className={s.contact}>Contactate con Nosotros</h4>
          <Link to={`/registrar/producer`} className={s.contactProducer}>
            <h4 className={s.contact}>Vendé con Nosotros</h4>
          </Link>
          <Modal active={active} toggle={toggle}>
              <Contact/>
          </Modal>
          <Link to={`/aboutUs`} style={{ textDecoration: "none" }}>
          <h4 className={s.aboutUs}>Sobre nosotros</h4>
          </Link>
        {/* column2 */}
        <div className={s.redes}>
            <a className={s.facebook} href="https://www.facebook.com/profile.php?id=100082560332640" target="_blank"><i class="fa-brands fa-facebook"></i></a>
            <br />
            <a className={s.instagram} href="https://www.instagram.com/concerteck01/" target="_blank"><span><i class="fa fa-instagram" aria-hidden="true"></i></span></a>
            <br />
        </div>
      </div>
    </div>
  )
}
