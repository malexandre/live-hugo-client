import React, { Component } from 'react'
import { List, ListDivider, ListItem } from 'react-toolbox/lib/list' // , ListSubHeader, ListDivider
import formatDateLib from 'format-date'

import css from './post-list.scss'
import SearchBar from './SearchBar'

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            items: [],
            loading: false,
            nextPage: undefined,
            error: undefined
        }

        this.onFilterChange = this.onFilterChange.bind(this)

        this.fetchNewQuery()
    }

    checkFetchStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        }

        const error = new Error(response.statusText)
        error.response = response
        throw error
    }

    async fetchNewQuery() {
        this.setState({ loading: true, error: undefined })

        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-user-token': 'todo'
            }
        }

        let res, json
        try {
            res = await fetch('/api/list', params)
            this.checkFetchStatus(res)
        }
        catch (err) {
            const message = err.response ? err.response.statusText : err
            this.setState({ loading: false, error: `Server error: ${message}` })
            return
        }

        try {
            json = await res.json()
        }
        catch (err) {
            this.setState({ loading: false, error: 'Error while decoding response from server' })
            return
        }

        this.setState({
            items: this.state.items.concat(json.items),
            loading: false,
            nextPage: json.nextPage
        })
    }

    formatDetails(item) {
        if (!item) {
            return ''
        }

        const details = []

        if (item.date) {
            details.push(<i className="material-icons">event</i>)
            details.push(formatDateLib('{year}-{month}-{day} {hours}:{minutes}', new Date(item.date)))
        }

        if (item.categories && item.categories.length) {
            details.push(<i className="material-icons">label</i>)
            details.push(item.categories.reduce((ret, cat) => (ret ? `${ret}, ${cat}` : cat)))
        }

        return <div className={ css.details }>{ details }</div>
    }

    onFilterChange(filter) {
        if (filter.trim() !== this.state.filter.trim()) {
            if (filter.trim()) {
                this.setState({ filter })
            }
            else {
                this.setState({ filter: '' })
            }
        }
    }

    render() {
        if (this.state.error) {
            return <div className={ css.error }>{ this.state.error }</div>
        }

        if (!this.state.items || this.state.items.length === 0) {
            return <div className={ css.noitem }>No post</div>
        }

        return (
            <div className={ css.postlist }>
                <SearchBar onFilterChange={ this.onFilterChange } />
                <List selectable ripple>
                    <ListDivider />
                    { this.state.items.map((item) => (
                        <ListItem className={ css.postitem }
                            key={ item.path }
                            caption={ item.title }
                            legend={ this.formatDetails(item) }
                            leftIcon={ item.draft ? 'visibility_off' : 'visibility' }
                            to={ `/post/${item.path.replace('.md', '')}` }/>
                    )) }
                </List>
            </div>
        )
    }
}

export default PostList
