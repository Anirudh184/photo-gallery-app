import React from 'react';
import axiosClient from '../../utils/axiosClient';
import { Auth0Context } from "../../react-auth0-spa";
import ImageListing from '../common/ImageListing';

class Profile extends React.Component {
    state = {
        images:[],
        noImagesFound: false,
        noImagesFound:false
    }
    static contextType = Auth0Context;

    componentDidMount = () => {
        const currentState = {...this.state};

        axiosClient.post('/api/me/images', {
            email: this.context.user.email
        })
        .then(res => {
            currentState.images = res.data;
            this.setState(currentState);
        })
        .catch(e => {
            if(e.response.status === 404) {
                currentState.noImagesFound = true;
                this.setState(currentState);
            }
        });
    }


    render() {
        if(this.state.noImagesFound) {
            return <h2>You have not uploaded images yet!</h2>
        }
        return( 
            <ImageListing images = {this.state.images} />
        );
    }
}

export default Profile;