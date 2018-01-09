// displays menu

import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

    render(){
        
        return (
            <div className="menu">
                <Link className="menu-item" to="/">Contacts</Link>
                <Link className="menu-item" to="/groups">Groups</Link>
            </div>
        );

    }
}

export default Menu