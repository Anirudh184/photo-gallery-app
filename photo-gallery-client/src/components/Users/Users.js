import React from 'react'; 
import axios from 'axios';
import axiosClient from "../../utils/axiosClient";
import { Link } from 'react-router-dom';

class Users extends React.Component{
    state = {
        users:[],
        loadingState: true
    }

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
                let user = (
                    <li key = {index}>
                        <Link to = {`/user/${singleUser._id}`}> {singleUser.email} </Link>
                    </li>
                );
                userList.push(user);
            });
        }

        if(this.state.loadingState) {
            return <p>Loading...</p>
        }

        return ( 
            <ul className = 'users-wrapper'>
                {userList}
            </ul>  
        );
    };
} 

export default Users;