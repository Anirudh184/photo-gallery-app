import axios from 'axios';



if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const axiosClient = axios.create({
        baseURL: 'https://localhost:5000'
    });
} else {
    const axiosClient = axios.create({
        baseURL: 'https://anirudh-photo-gallery-app.herokuapp.com'
    });
}

export default axiosClient;