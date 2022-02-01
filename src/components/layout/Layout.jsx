import React, { Fragment } from 'react'
import Header from './Header'
import classes from './Layout.module.css';

export default function Layout(props) {
    return (
        <Fragment>
            <Header />
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    )
}
