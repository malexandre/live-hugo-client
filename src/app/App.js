import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppBar } from 'react-toolbox/lib/app_bar'
import { Navigation } from 'react-toolbox/lib/navigation'

import AppMenu from './AppMenu'
import PostList from '../post-list/PostList'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <AppBar title="Live Hugo">
                        <Navigation type="horizontal">
                            <AppMenu />
                        </Navigation>
                    </AppBar>
                    <Route exact path="/" component={ PostList } />
                    <Route path="/post/:filename"
                        render={ ({ match }) => (
                            <div>
                                <p>This is the route &quot;/post&quot;! You are viewing { match.params.filename }</p>
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
