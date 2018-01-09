// manage groups

import React, {Component} from 'react';



class Groups extends Component {

    constructor(props) {

        super(props);
        this.state = {name: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDel = this.handleDel.bind(this);
        
    }

    handleChange(event) {
        this.setState({'name': event.target.value});
    }
    
    handleAdd(event) {
        this.props.addGroup(this.state.name);
        this.setState({name: ''});
        event.preventDefault();
    }

    handleDel(event) {
        this.props.delGroup(event.target.id);
        event.preventDefault();
    }    

    render(){

        const groups = this.props.groups;
        
        const list = groups.map((group) => {
            return (
                <form id={group.id} onSubmit={this.handleDel} className="group-form" key={group.id}>
                    <span className="list-item">{group.name}</span>
                    <button type="submit">-</button>
                </form>
            )
        });
        
        return (
            <div className="content">
                <h1>Groups</h1>
                {list}
                <form onSubmit={this.handleAdd} className="group-form">
                    <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
                    <button type="submit">+</button>
                </form>
            </div>
        );

    }
}

export default Groups