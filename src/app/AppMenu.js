import React, { Component } from 'react'
import { IconMenu, MenuDivider, MenuItem } from 'react-toolbox/lib/menu'

class AppMenu extends Component {
    render() {
        return (
            <IconMenu position="topRight" menuRipple>
                <MenuItem value="download" icon="get_app" caption="Download" />
                <MenuItem value="help" icon="favorite" caption="Favorite" />
                <MenuItem value="settings" icon="open_in_browser" caption="Open in app" />
                <MenuDivider />
                <MenuItem value="signout" icon="delete" caption="Delete" disabled />
            </IconMenu>
        )
    }
}

export default AppMenu
