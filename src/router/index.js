import VueRouter from "vue-router";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import UserCenter from "../pages/UserCenter"
import MyInfo from "../components/MyInfo"
import BuyerBidOrder from "../components/BuyerBidOrder"
import SoldGoods from "../components/SoldGoods"
import StarredGoods from "../components/StarredGoods"
import Sell from "../pages/Sell"
import Detail from "../pages/Detail"
import ContactUs from "../pages/ContactUs"
import Admin from "../pages/Admin"
import Message from "../pages/Message"
export default new VueRouter({
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/',
            component: Home
        },
        {
            path: '/userCenter',
            component: UserCenter,
            children: [{
                    path: 'myInfo',
                    component: MyInfo
                },
                 {
                    path: 'starredGoods',
                    component: StarredGoods

                }, {
                    path: 'buyerBidOrder',
                    component: BuyerBidOrder

                }, {
                    path: 'soldGoods',
                    component: SoldGoods

                },
            ],redirect: 'userCenter/myInfo'
        },
        {
            path: '/sell',
            component: Sell
        },
        {
            path: '/detail',
            component: Detail
        },
        {
            path: '/contactUs',
            component: ContactUs
        },
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/message',
            component: Message
        }
    ]
})