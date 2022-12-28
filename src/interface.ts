export interface User {
    id: number;
    name: string;
    password: string;
    studentId: string;
    phone: string;
    creditScore: number;
    isSeller: number;
    isAdmin: number;
}

export interface Goods {
    id: number;
    name: string;
    introduce: string;
    picture: string;
    credential: string;
    price: number;
    releaseTime: string;
    isRelease: number;
    userId: number;
}

export interface Collection {
    id: number;
    userId: number;
    goodsId: number;
}

export interface GoodsOrder {
    id: number;
    goodsId: number;
    userId: number;
    createTime: string;
    status: number;
    completeTime: string;
    goodsUserScore: number;
    goodsUserEvaluation: string | null;
    userScore: number;
    userEvaluation: string | null;
}

export interface Message {
    id: number;
    userId: number;
    goodsId: number;
    details: string;
    createTime: string;
    fatherMessageId: number;
    atUserId: number;
}

export interface UserInfo {
    id: number;
    name: string;
    studentId: string;
    phone: string;
    creditScore: number;
    isSeller: number;
    goodsUserScore: number;
    userScore: number;
}

export interface GoodsInfo {
    id: number;
    name: string;
    introduce: string;
    picture: string;
    credential: string;
    price: number;
    releaseTime: string;
    isRelease: number;
    userId: number;
    userName: string;
    goodsUserScore: number;
    userScore: number;
}

export interface CollectionInfo {
    goodsId: number;
    goodsName: string;
    goodsIntroduce: string;
    goodsPicture: string;
    goodsPrice: number;
    userId: number;
    userName: string;
    userPhone: string;
}

export interface GoodsOrderInfo {
    id: number;
    createTime: string;
    status: number;
    completeTime: string;
    goodsUserScore: number;
    goodsUserEvaluation: string;
    userScore: number;
    userEvaluation: string;
    goodsUserName: string;
    userName: string;
    goodsName: string;
}

export interface MessageInfo {
    id: number;
    userId: number;
    userName: string;
    goodsId: number;
    goodsName: string;
    details: string;
    createTime: string;
    fatherMessageId: number;
    atUserId: number;
    fatherMessageName: string;
    atUserName: string;
}