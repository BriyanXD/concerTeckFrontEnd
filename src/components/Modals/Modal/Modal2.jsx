import React, { Component } from 'react';
import Portal from '../Portal';
import styles from './Modal2.module.css';

export default class Modal2 extends Component {
    render(){
        const { children, toggle, active } = this.props;

        return(
            <Portal>
                {active && (
                <div className={styles.containerBase}>
                    <div className={styles.containerWindow}>
                        <button className={styles.btn} onClick={toggle}>x</button>
                        <div>{children}</div>
                    </div>
                    <div onClick={toggle} className={styles.backgroundWindow}/>
                </div>)}
            </Portal>
        )
    }
}