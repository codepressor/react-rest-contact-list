// edit contact details

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'; // access router url parameters



class ContactDetail extends Component {

    constructor(props) {

        super(props);
        this.state = {id: '', name: '', ngroup: '', mobile: '', msg: ''};    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
        this.setState({msg: ''});
    }
    
    handleSubmit(event) {
        this.props.editContact(this.state);
        this.setState({msg: 'Contact saved'});
        event.preventDefault();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const contacts = this.props.contacts;
        const contact = contacts.find((contact) => { return contact.id == id; });
        this.setState({id: contact.id, name: contact.name, ngroup: contact.ngroup, mobile: contact.mobile});
    }

    render() {
       
        const groups = this.props.groups;
        
        return (
            <div className="content">
                <h1>Contact Details</h1>
                <form onSubmit={this.handleSubmit} className="detail-form">
                    <input type="text" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
                    <select id="ngroup" value={this.state.ngroup} onChange={this.handleChange}>
                        <option value='' disabled>Select Group</option>
                        {groups.map((group) => 
                            <option key={group.id} name={group.name} value={group.name}>{group.name}</option>
                        )}
                    </select>
                    <input type="text" id="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder="Mobile"/>
                    <button type="submit">Save</button>
                </form>
                <div className="msg">{this.state.msg}</div>
            </div>
        );

    }
}

export default withRouter(ContactDetail)