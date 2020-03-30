import React from 'react';
import axios from 'axios';
import { Auth0Context } from "../../react-auth0-spa";


class UploadImages extends React.Component {

    state = {
        files: [],
        statusText: ''
    }
    static contextType = Auth0Context;

    handleFileChange = (e) => {
        this.setState({
            files: e.target.files
        }); 
    }

    formSubmit = async (e) => {
        e.preventDefault();
        const currentState = {...this.state};
        console.log('currentState', currentState.files.length);
        const data = new FormData();

        data.set('user', this.context.user.email); 
        for(let i = 0; i < currentState.files.length; i++) {    
            data.append('image', currentState.files[i]);
        } 
        
        await axios({
            method: 'post',
            url: 'https://anirudh-photo-gallery-app.herokuapp.com',
            data: data,
            headers: {
                'content-type': `multipart/form-data;`,
            }
        }).then(res => {
            currentState.statusText = 'Images Uploaded Succesfully'
            this.setState(currentState);
            e.target.reset();
        }).catch(e => {
            currentState.statusText = 'Something went wrong. Please try again later';
            this.setState(currentState);
            e.target.reset();
        });  

        
    }

    render () { 
        return(
            <div className = "container">
                <form onSubmit = {this.formSubmit}>
                    <label>Image Upload: </label>
                    <input onChange = {this.handleFileChange} type = 'file' multiple />
    
                    <input type = "submit" value = "Upload"/>
                </form> 
    
                {
                    this.state.statusText != '' ? 
                    (<div className = 'status'>
                        {this.state.statusText}
                    </div>)  
                    : null 
                } 
            </div>
        );
    }
}
export default UploadImages;