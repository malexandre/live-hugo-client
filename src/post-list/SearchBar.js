import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Input } from 'react-toolbox/lib/input'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: props.init
        }

        this.onFilterChange = this.onFilterChange.bind(this)
        this.onFilterCallback = _.debounce(this.onFilterCallback, 400)
    }

    onFilterChange(newValue) {
        this.setState({ filter: newValue })
        this.onFilterCallback()
    }

    onFilterCallback() {
        if (this.props.onFilterChange) {
            this.props.onFilterChange(this.state.filter)
        }
    }

    render() {
        return (
            <div>
                <Input type="text"
                    label="Filter"
                    icon="search"
                    value={ this.state.filter }
                    onChange={ this.onFilterChange }/>
            </div>
        )
    }
}

SearchBar.propTypes = {
    init: PropTypes.string,
    onFilterChange: PropTypes.func
}

export default SearchBar
