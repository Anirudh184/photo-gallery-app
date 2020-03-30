import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://anirudh-photo-gallery-app.herokuapp.com'
});

export default axiosClient;