import React, { Component } from 'react';
import Portal from '../Portal';
import style from './Modal.module.css';

export default class Modal extends Component {
    render(){
        const { children, toggle, active } = this.props;

        return(
            <Portal>
                {active && (
                <div className={style.containerBase}>
                    <div className={style.containerWindow}>
                        <button className={style.btn} onClick={toggle}>x</button>
                        <div>{children}</div>
                    </div>
                    <div onClick={toggle} className={style.backgroundWindow}/>
                </div>)}
            </Portal>
        )
    }
}