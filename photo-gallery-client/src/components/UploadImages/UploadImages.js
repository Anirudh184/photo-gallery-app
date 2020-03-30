import React from 'react';
import axios from 'axios';
import { Auth0Context } from "../../react-auth0-spa";


class UploadImages extends React.Component {

    state = {
        files: []
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
        // currentState.files.forEach(file => {
        //     data.append('files[]', file);
        // }); 
        for(let i = 0; i < currentState.files.length; i++) {    
            data.append('image', currentState.files[i]);
        } 
        
        const res = await axios({
            method: 'post',
            url: 'http://localhost:5000/api/upload-images',
            data: data,
            headers: {
                'content-type': `multipart/form-data;`,
            }
        });

        console.log(res);

    }

    render () { 
        return(
            <form onSubmit = {this.formSubmit}>
                <label>Image Upload: </label>
                <input onChange = {this.handleFileChange} type = 'file' multiple />

                <input type = "submit" value = "Upload"/>
            </form>
        );
    }
}
export default UploadImages;