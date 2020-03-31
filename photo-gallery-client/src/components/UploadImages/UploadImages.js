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
        document.querySelector('.loading-component').style.display = 'block';
        const currentState = {...this.state};
        console.log('currentState', currentState.files.length);
        const data = new FormData();

        data.set('user', this.context.user.email); 
        for(let i = 0; i < currentState.files.length; i++) {    
            data.append('image', currentState.files[i]);
        } 

        let baseURL = '';
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            baseURL = 'http://localhost:5000';
        } else {
            baseURL = 'https://anirudh-photo-gallery-app.herokuapp.com'
        }
        await axios({
            method: 'post',
            url: baseURL + '/api/upload-images',
            data: data,
            headers: {
                'content-type': `multipart/form-data;`,
            }
        }).then(res => {
            currentState.statusText = 'Images Uploaded Succesfully'
            this.setState(currentState);
        }).catch(e => { 
            console.log(e.response.data.error)
            currentState.statusText = e.response.data.error;
            this.setState(currentState); 
        }).finally(()=>{
            document.querySelector('.form').reset();
            document.querySelector('.loading-component').style.display = 'none';
        });  

        
    }

    render () { 
        return(
            <div className = "container">
                <form className = 'form' onSubmit = {this.formSubmit}>
                    <label>Image Upload: </label>
                    <input onChange = {this.handleFileChange} type = 'file' multiple />
    
                    <input type = "submit" value = "Upload"/>
                </form> 
    
                {
                    this.state.statusText !== '' ? 
                    (<div className = 'status'>
                        {this.state.statusText}
                    </div>)  
                    : null 
                } 
                <div className='loading-component' style = {{display:'none'}}>
                    Please Wait...
                </div>
            </div>
        );
    }
}
export default UploadImages;