// main app

import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Menu from './menu.jsx';
import ContactList from './contact-list.jsx';
import ContactDetail from './contact-detail.jsx';
import Groups from './groups.jsx';
import ApiVal from './api-val.jsx';



class App extends Component {

    constructor(props){

        super(props);

        this.state = {
            contacts: [],
            groups: [],
            api: 'http://127.0.0.1:3000'
        };

        this.addContact = this.addContact.bind(this);
        this.delContact = this.delContact.bind(this);
        this.editContact = this.editContact.bind(this);
        this.getAllContacts = this.getAllContacts.bind(this);

        this.addGroup = this.addGroup.bind(this);
        this.delGroup = this.delGroup.bind(this);        
        this.getAllGroups = this.getAllGroups.bind(this);

    }

    componentDidMount() {

        this.getAllContacts();
        this.getAllGroups();

    }

    getAllContacts() {

        fetch(this.state.api + '/contacts/', {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(ApiVal.checkStatus)
        .then(result => result.json())
        .then(contacts => this.setState({contacts}))

    }

    getAllGroups() {

        fetch(this.state.api + '/groups/', {  
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(ApiVal.checkStatus)
        .then(result => result.json())
        .then(groups => this.setState({groups}))

    }

    addContact(contact) {

        fetch(this.state.api + '/contacts/', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contact })
        })
        .then(ApiVal.checkStatus)
        .then(result => result.json())

        this.getAllContacts(); 

    }

    delContact(id) {

        fetch(this.state.api + '/contacts/' + id, {  
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(ApiVal.checkStatus)
        .then(result => result.json())

        this.setState({contacts: this.state.contacts.filter((item) => item.id != id)});     

    }

    editContact(contact) {

        fetch(this.state.api + '/contacts/' + contact.id, {  
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contact })
        })
        .then(ApiVal.checkStatus)
        .then(result => result.json())

        this.setState({contacts: this.state.contacts.map(
            (el) => el.id === contact.id ? Object.assign({}, el, {name: contact.name, ngroup: contact.ngroup, mobile: contact.mobile}) : el 
        )});

    }

    addGroup(group) {

        fetch(this.state.api + '/groups/', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: group })
        })
        .then(ApiVal.checkStatus)
        .then(result => result.json())

        this.getAllGroups();     

    }

    delGroup(id) {

        fetch(this.state.api + '/groups/' + id, {  
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(ApiVal.checkStatus)
        .then(result => result.json())

        this.setState({groups: this.state.groups.filter((item) => item.id != id)});     

    }

    render(){

        return(

            <Router basename={'/'}>
                <div className="wrapper">
                    <Menu />
                    
                    <Switch>
                        <Route 
                            exact 
                            path="/" 
                            render={()=>
                                <ContactList 
                                    contacts={this.state.contacts} 
                                    groups={this.state.groups} 
                                    addContact={this.addContact} 
                                    delContact={this.delContact}
                                />
                            }
                        />
                        <Route 
                            path="/groups" 
                            render={()=>
                                <Groups 
                                    groups={this.state.groups} 
                                    addGroup={this.addGroup} 
                                    delGroup={this.delGroup}
                                />
                            }
                        />
                        <Route 
                            path="/contact/:id" 
                            render={()=>
                                <ContactDetail 
                                    contacts={this.state.contacts}
                                    groups={this.state.groups} 
                                    editContact={this.editContact}
                                />
                            }
                        />
                        <Route 
                            path='*'
                            render={()=>
                                <ContactList 
                                    contacts={this.state.contacts} 
                                    groups={this.state.groups} 
                                    addContact={this.addContact} 
                                    delContact={this.delContact}
                                />
                            }
                        />
                    </Switch>
                </div>
            </Router>

        );

    }
}

export default App