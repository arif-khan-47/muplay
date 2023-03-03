import axios from "axios";

// let headers = {

// }

const API = axios.create({
    // baseURL : process.env.REACT_APP_BASEURL,
    // baseURL: 'https://api.shree.network/api',

    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    // baseURL: 'https://cors-anywhere-969l.onrender.com/https://api.purplexott.com/api',

    // withCredentials: true,
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NmNzMxNWM5YjRmZDJjOGVhZGNjYzUiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3NzU4NDg4MSwiZXhwIjoxNzA5MTQyNDgxLCJpc3MiOiJ6ZXpvLmluIn0.a-pP6pwbgHHennRKs9__Y7P5HtDZXRUqVgiUcfmmfRo',

        "x-requested-with": "",
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


// history endpoints

export const addToHistoryEndpoint = (data, headers) => API.post(`/history`, data, { headers });
export const updateHistoryEndpoint = (data, headers) => API.put(`/history`, data, { headers });
export const getHistory = () => API.get(`/history`);

// section routes
export const getSectionByCategory = (id) => API.get(`/section/list/${id}`);
export const getSections = () => API.get(`/section`);

// category endpoints
export const getAllContentEndpoint = (data) => API.get(`/content?${data || ''}`);
export const getCategories = (data) => API.get(`/categories?${data || ''}`);

// Header Endpoints 
export const layoutData = () => API.get(`/settings`);


// Search Endpoints 
export const searching = (data) => API.get(`search?query=${data}`);


// content endpoints
export const allMovies = () => API.get("/content");
export const getContect = (query) => API.get(`/content?${query}`);
export const getSinglePageData = (slug) => API.get(`/content?slug=${slug}`);
export const getContentSignCookieEndPoint = (id, query) => api.get(`/content/stream/${id}?type=${query}`);

//Add remove and get Favourite 
export const getFavorite = (data, headers) => API.get("/favorite", data, { headers });
export const addFavorite = (id) => API.post("/favorite",id);
export const delFavorite = () => API.delete("/favorite");





// subscriptions endpoint
export const getSubscriptions = () => API.get(`/subscriptions`);
export const checkIsPrimium = () => API.get(`/subscription/check`);

// payment endpoints
  export const checkout = (data, headers) => API.post(`/payments/checkout`, data, { headers });

  export const verifyPayment = (data, headers) => API.post(`/payments/verify`, data, { headers });

// users endpoint
export const deactivateAccount = () => API.delete(`/users`);

// watchtime endpoint
export const addWatchTime = (data, headers) => API.post(`/watchtime`, data, { headers });

// view count endpoint
export const countView = (data, headers) => API.post(`/views/count`, data, { headers });

// trending endpoint
export const getTrending = () => API.get(`/trending/`);


//splash Screen
export const splashInfo = () => API.get(`/settings/app`);


export default API;