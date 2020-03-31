import React from 'react'; 
import axios from 'axios';
import axiosClient from "../../utils/axiosClient";
import { Link } from 'react-router-dom';
import { Auth0Context } from "../../react-auth0-spa";

class Users extends React.Component{
    state = {
        users:[],
        loadingState: true
    }
    static contextType = Auth0Context;

    componentDidMount = () => {
        const currentState = {...this.state}; 
        axiosClient.get('/api/get-users')
        .then(response => {
            currentState.users = response.data;
            currentState.loadingState = false;
            this.setState(currentState);
        })
        .catch(e => {
            console.log(e)
        });
    }


    render() {
        let userList = [];
        if(this.state.users.length) {
            this.state.users.forEach((singleUser, index) => {
                if(singleUser.email != this.context.user.email) {
                    let user = (
                        <li key = {index}>
                            <Link to = {`/user/${singleUser._id}`}> {singleUser.email} </Link>
                        </li>
                    );
                    userList.push(user);
                }
            });
        }

        if(this.state.loadingState) {
            return <p>Loading...</p>
        }

        return ( 
            <div className = 'container'>
                <h1 className = 'page-title'> All Users </h1>
                {
                    userList.length ? (
                        <ul className = 'users-wrapper'>
                            {userList}
                        </ul>
                    ) 
                    : <p>Looks like your're are the only user we got as of now.</p>
                } 
            </div>
        );
    };
} 

export default Users;