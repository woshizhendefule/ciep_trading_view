import http from './http';

export default {
    adminLogin(params: any) {
        return http.get(`/user/adminLogin?name=${params.name}&password=${params.password}`)
    },

    getAllUser() {
        return http.get(`/user/getAllUser`)
    },
    sellerQualificationCheckPass(params: any) {
        return http.post(`/user/sellerQualificationCheckPass?id=${params.id}`, params)
    },
    sellerQualificationCheckNotPass(params: any) {
        return http.post(`/user/sellerQualificationCheckNotPass?id=${params.id}`, params)
    },
    deleteUser(params: any) {
        return http.post(`/user/deleteUser?id=${params.id}`, params)
    },

    getAllGoodsOrderByAsc() {
        return http.get(`/goods/getAllGoodsOrderByAsc`)
    },
    releaseQualificationCheckPass(params: any) {
        return http.post(`/goods/releaseQualificationCheckPass?id=${params.id}`, params)
    },
    releaseQualificationCheckNotPass(params: any) {
        return http.post(`/goods/releaseQualificationCheckNotPass?id=${params.id}`, params)
    },
    deleteGoods(params: any) {
        return http.post(`/goods/deleteGoods?id=${params.id}`, params)
    },

    getParentChildMessagesUser() {
        return http.get(`/message/getParentChildMessagesUser`)
    },
    deleteMessage(params: any) {
        return http.post(`/message/deleteMessage?id=${params.id}`, params)
    },

    getUsersGoodsOrder() {
        return http.get(`/goods_order/getUsersGoodsOrder`)
    },
    deleteComments(params: any) {
        return http.post(`/goods_order/deleteComments?id=${params.id}`, params)
    },
    cancelOrders(params: any) {
        return http.post(`/goods_order/cancelOrders?id=${params.id}`, params)
    },


    userLogin(params: any) {
        return http.get(`/user/userLogin?name=${params.name}&password=${params.password}`)
    },

    getAllGoodsOrderByDesc() {
        return http.get(`/goods/getAllGoodsOrderByDesc`)
    },
}