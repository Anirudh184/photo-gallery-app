import React from 'react';
import axiosClient from '../../utils/axiosClient';
import { Auth0Context } from "../../react-auth0-spa";
import ImageListing from '../common/ImageListing';

class Profile extends React.Component {
    state = {
        images:[],
        noImagesFound: false, 
        loading: true
    }
    static contextType = Auth0Context;

    componentDidMount = () => {
        const currentState = {...this.state};

        axiosClient.post('/api/me/images', {
            email: this.context.user.email
        })
        .then(res => {
            currentState.images = res.data;
            currentState.loading = false;
            this.setState(currentState); 
        })
        .catch(e => {
            if(e.response.status === 404) {
                currentState.noImagesFound = true;
                currentState.loading = false;
                this.setState(currentState);
            }
        });
    }


    render() {
        if(this.state.noImagesFound) {
            return <h2>You have not uploaded images yet!</h2>
        }
        return( 
            <div className = 'container'>
                {
                    this.state.loading ? <p>Loading...</p> : (<ImageListing images = {this.state.images} />)
                } 
            </div>
        );
    }
}

export default Profile;