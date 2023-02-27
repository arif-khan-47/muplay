import axios from "axios";

// let headers = {

// }

const API = axios.create({
    // baseURL : process.env.REACT_APP_BASEURL,
    // baseURL: 'https://api.shree.network/api',

    baseURL: 'https://cors-anywhere-969l.onrender.com/https://api.zezosoft.com/api',
    // withCredentials: true,
    headers: {
        'Authorization': 'BearerToken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NmNzMxNWM5YjRmZDJjOGVhZGNjYzUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NTMzMDkyOSwiZXhwIjoxNzA2ODg4NTI5LCJpc3MiOiJ6ZXpvLmluIn0.ZqHHkje24z1yMRxV14Tpd8hq7fRx5VuIZxiutJHsc8s',

        "x-requested-with":"",
        'Content-Type': "application/json",
        'Accept': "application/json",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type",
        'Access-Control-Allow-Origin': 'http://192.168.19:8081',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

    }
});



// Auth Endpoints
export const login = (data) => API.post("/auth/login", data);
export const verifyOTP = (data) => API.post("/auth/verify-otp", data);


// auth endpoints
export const verifyOtpApiEndpoint = (data) => API.post("/auth/verify-otp", data);
export const loginApiEndpoint = (data) => API.post("/auth/login", data);
export const registerApiEndpoint = (data) => API.post("/auth/register", data);
export const resetPassword = (id, token) => API.get(`/auth/reset-password/${id}/${token}`);
export const resetPasswordConfirm = (id, data) => API.post(`/auth/reset-password/${id}`, data);
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const whoamiAuth = () => API.get("/auth/whoami");


// category endpoints
export const getAllContentEndpoint = (data) => API.get<IAllContentResponse>(`/content?${data || ''}`);
export const getCategories = (data) => API.get(`/categories?${data || ''}`);

// Header Endpoints 
export const layoutData = () => API.get(`/settings`);


// Search Endpoints 
export const searching = (data) => API.get(`search?query=${data}`);


// content endpoints
export const allMovies = () => API.get("/content");
export const getContect = (query) => API.get(`/content?${query}`);
export const getSinglePageData = (slug) => API.get(`/content?slug=${slug}`);

// subscriptions endpoint
export const getSubscriptions = () => API.get(`/subscriptions`);
export const checkIsPrimium = () => API.get(`/subscription/check`);

// payment endpoint
export const checkout = (data) => API.post(`/payments/checkout`, data);
export const verifyPayment = (data) => API.post(`/payments/verify`, data);

// users endpoint
export const deactivateAccount = () => API.delete(`/users`);

// watchtime endpoint
export const addWatchTime = (data) => API.post(`/watchtime`, data);

// view count endpoint
export const countView = (data) => API.post(`/views/count`, data);

// trending endpoint
export const getTrending = () => API.get(`/trending/`);


//splash Screen
export const splashInfo = () => API.get(`/settings/app`);


export default API;