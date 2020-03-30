import axios from 'axios';


let axiosClient = null;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    axiosClient = axios.create({
        baseURL: 'https://localhost:5000'
    });
} else { 
    axiosClient = axios.create({
        baseURL: 'https://anirudh-photo-gallery-app.herokuapp.com'
    });
} 

export default axiosClient;
