import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button } from 'react-toolbox/lib/button'
import logo from './logo.svg'
import css from './App.scss'

class App extends Component {
    render() {
        return (
            <Router>
                <div className={ css.app }>
                    <header className={ css.header }>
                        <img src={ logo } className={ css.logo } alt="logo" />
                        <h1 className={ css.title }>Welcome to Malexandre&apos;s React Config</h1>
                    </header>
                    <p className={ css.intro }>React-router and React-toolbox are available!</p>
                    <Route exact
                        path="/"
                        render={ () => (
                            <div>
                                <p>This is the route &quot;/&quot;!</p>
                                <p>
                                    <Link to="/about">Change route to &quot;/about&quot;</Link>
                                </p>
                                <p>
                                    <Button icon="bookmark" label="Bookmark" raised primary />
                                </p>
                            </div>
                        ) }/>
                    <Route path="/about"
                        render={ () => (
                            <div>
                                <p>This is the route &quot;/about&quot;!</p>
                                <p>
                                    <Link to="/">Change route to &quot;/&quot;</Link>
                                </p>
                            </div>
                        ) }/>
                </div>
            </Router>
        )
    }
}

export default App
