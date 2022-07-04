import React from "react";
import { BsWhatsapp } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
//import { BsInstagram } from 'react-icons/bs';
import s from './FooterFav.module.css'


export default function footerFav(){

    return(
        <div className={s.conteiner}>
            <div className={s.share}>
                <a href="https://api.whatsapp.com/send?text=http://localhost:3000/" target='_blanck'><BsWhatsapp size={30} className={s.icon}/></a>
                <a href="http://www.facebook.com/sharer/sharer.php?u=http%3A//localhost%3A3000/" target='_blanck'><BsFacebook size={30} className={s.icon}/></a>
                {/* <a href=""><BsInstagram size={30} className={s.icon}/></a> */}
            </div>
        </div>
    )
}