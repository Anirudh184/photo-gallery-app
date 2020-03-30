import React from 'react';
import axiosClient from '../../utils/axiosClient';
import ImageListing from '../common/ImageListing';


class SingleUser extends React.Component {
    
    state = {
        images:[],
        loadingState: true
    }

    componentDidMount = () => {
        const currentState = {...this.state};
        const { match: { params } } = this.props;
        // console.log(params.id);
        axiosClient.get(`/api/user/${params.id}`)
        .then(res => {
            currentState.images = res.data;
            currentState.loadingState = false;
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
            return <h2>User has not uploaded any images yet!</h2>
        }
        return( 
            <ImageListing images = {this.state.images} />
        );
    }
}

export default SingleUser;