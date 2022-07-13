import React from 'react';
import agu from '../../img/agu.jpeg';
import ari from '../../img/ari.jpeg';
import briyan from '../../img/brian.jpeg';
import diego from '../../img/diego.jpeg';
import lio from '../../img/lio.jpeg';
import lucas from '../../img/lucas.jpeg';
import noe from '../../img/noe.jpeg';
import yo from '../../img/yo.jpeg';
import style from './aboutUs.module.css';
import { Link } from 'react-router-dom'

export default function AboutUs(){
    return(

        <div className={style.container}>
            <div className={style.contenedor}>
            <div className={style.aboutUs}>
            <h1>Sobre nosotros</h1>
            </div>
            <div className={style.box}>
            <h3>Agustin Trossero</h3>
            <img className={style.img} src={agu} alt=""/>
            <p>Desarrollador web, entusiasta en tecnologías como Javascript, React, Redux, Css, Node.js, Express, PostgreSQL y SQLite, Git y GitHub.</p>
            </div>
            <div className={style.box}>
            <h3>Briyan Angel Bohtelo Gomez</h3>
            <img className={style.img} src={briyan} alt=""/>
            <p>Apasionado programador FullStack con amplios conocimientos en diferentes tecnologías como Javascript, React, Svelt, Redux, Css, Node.js, Express, PostgreSQL, Less, Sass, HTML, Git y GitHub</p>
            </div>
            <div className={style.box}>
            <h3>Diego Bullor</h3>
            <img className={style.img} src={ari} alt="" />
            <p>Programador FullStack. Cuento con conocimientos en Javascript, React, Redux, Css, Next.js, Node.js, Express, PostgreSQL, SQLite, Git y GitHub.</p>
            </div>
            <div className={style.box}>
            <h3>Ivan Ariel Chauca</h3>
            <img className={style.img} src={diego} alt=""/>
            <p>Desarrollador FullStack. Apasionado en tecnologías como Javascript, React, Typescript, Redux, Css, Node.js, Express, MongoDB, PostgreSQL, SQLite, Git y GitHub.</p>
            </div>
            <div className={style.box}>
            <h3>Lione Orbe</h3>
            <img className={style.img} src={lio} alt=""/>
            <p>Desarrollador web, con conocimiento en JavaScript, CSS, HTML, React, Redux, Node.js, Express, Sequelize, PostgreSQL, Git, GitHub.</p>
            </div>
            <div className={style.box}>
            <h3>Lucas Acuña Ortiz</h3>
            <img className={style.img} src={lucas} alt=""/>
            <p>Desarrollador FullStack. Poseo conocimientos en analisis de sistemas, Python, Javascript, React, Redux, Css, Node.js, Express, PostgreSQL, SQLite, Git y GitHub.</p>
            </div>
            <div className={style.box}>
            <h3>Noelia Ingala</h3>
            <img className={style.img} src={noe} alt=""/>
            <p>Diseñadora gráfica y desarrolladora web FullStack. Domino tecnologías como Javascript, React, Redux, Css, Node.js, Express,PostgreSQL, SQLite, Ai, Ps, Ae, Cdr, etc, Git y GitHub</p>
            </div>
            <div className={style.box}>
            <h3>Solana Romero</h3>
            <img className={style.img} src={yo} alt="" />
            <p>Programadora FullStack, con conocimientos en tecnologías como Javascript, React, Redux, Css, Diseño UX/UI, Node.js, Express, PostgreSQL, SQLite, Git y GitHub.</p>
            </div>
        </div>
        <div className={style.btnDiv}>
            <Link to={'/'}>
                <button className={style.button}>Volver a inicio</button>
            </Link>
        </div>
        </div>


    )
}