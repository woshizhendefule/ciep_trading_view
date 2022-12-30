import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.VUE_APP_AXIOS_BASEURL,
    withCredentials: true
})

Axios.interceptors.request.use(
    (request) => {
        const getItemToken = localStorage.getItem("token")
        if (getItemToken != '' && getItemToken != undefined) {
            request.headers!.authorization = `Bearer ${getItemToken}`
        }
        console.log("发送请求: " + request.method + "\n" + request.url);
        console.log(request.data);
        return request;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
)

Axios.interceptors.response.use(
    (response) => {
        if (response.status == 200 && response.data.code == 200) {
            console.log("请求成功: " + response.config.url);
            console.log(response.data);
            return Promise.resolve(response.data)
        } else {
            console.log("请求失败: " + response.config.url);
            console.log(response.data);
            return Promise.resolve(response.data)
        }
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
)

export default {
    get(url: string) {
        return Axios.get(url);
    },

    post(url: string, data: any, config?: any) {
        return Axios.post(url, data, config || {});
    }
};