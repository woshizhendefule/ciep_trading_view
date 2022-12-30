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

    getAllGoodsOrder() {
        return http.get(`/goods_order/getAllGoodsOrder`)
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
    registered(params: any) {
        return http.post(`/user/registered?name=${params.name}&password=${params.password}studentId=${params.studentId}&phone=${params.phone}&`, params)
    },
    retrievePassword(params: any) {
        return http.post(`/user/retrievePassword?name=${params.name}&password=${params.password}studentId=${params.studentId}&phone=${params.phone}&`, params)
    },
    toViewUserInfo() {
        return http.get(`/user/toViewUserInfo`)
    },
    toViewGoods(params: any) {
        return http.get(`/goods/toViewGoods?id=${params.id}`)
    },

    getAllGoodsOrderByDesc() {
        return http.get(`/goods/getAllGoodsOrderByDesc`)
    },
    searchGoods(params: any) {
        return http.get(`/goods/searchGoods?name=${params.name}`)
    },

    getParentMessagesUser(params: any) {
        return http.get(`/message/getParentMessagesUser?goodsId=${params.goodsId}`)
    },
    getChildMessagesUser(params: any) {
        return http.get(`/message/getChildMessagesUser?goodsId=${params.goodsId}&fatherMessageId=${params.fatherMessageId}`)
    },
    postMessage(params: any) {
        return http.post(`/message/postMessage?userId=${params.userId}&goodsId=${params.goodsId}&details=${params.details}&fatherMessageId=${params.fatherMessageId}&atUserId=${params.atUserId}`, params)
    },

    goodsCollection(params: any) {
        return http.post(`/collection/goodsCollection?goodsId=${params.goodsId}`, params)
    },

    createOrders(params: any) {
        return http.post(`/goods_order/createOrders?goodsId=${params.goodsId}`, params)
    },

    modifyUserName(params: any) {
        return http.post(`/user/modifyUserName?newName=${params.newName}`, params)
    },
    modifyUserPhone(params: any) {
        return http.post(`/user/modifyUserPhone?newPhone=${params.newPhone}`, params)
    },
    changePassword(params: any) {
        return http.post(`/user/changePassword?newPassword=${params.newPassword}`, params)
    },
    sellerQualificationApply() {
        return http.get(`/user/sellerQualificationApply`)
    },

    getUsersCollection() {
        return http.get(`/collection/getUsersCollection`)
    },
    deleteCollection(params: any) {
        return http.post(`/collection/deleteCollection?id=${params.id}`, params)
    },

    getUsersGoods() {
        return http.get(`/goods/getUsersGoods`)
    },

    getGoodsUsersGoodsOrder(params: any) {
        return http.get(`/goods_order/getGoodsUsersGoodsOrder?goodsUserId=${params.goodsUserId}`)
    },
    getUsersGoodsOrder(params: any) {
        return http.get(`/goods_order/getUsersGoodsOrder?userId=${params.userId}`)
    },

    completeOrders(params: any) {
        return http.post(`/goods_order/completeOrders?id=${params.id}`, params)
    },

    commentGoodsUser(params: any) {
        return http.post(`/goods_order/commentGoodsUser?id=${params.id}&goodsUserScore=${params.goodsUserScore}&goodsUserEvaluation=${params.goodsUserEvaluation}`, params)
    },
    commentUser(params: any) {
        return http.post(`/goods_order/commentUser?id=${params.id}&userScore=${params.userScore}&userEvaluation=${params.userEvaluation}`, params)
    },

    cancelOrdersApply(params: any) {
        return http.post(`/goods_order/cancelOrdersApply?id=${params.id}`, params)
    },

}