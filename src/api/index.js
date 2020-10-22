import axios from "./config"
//登入
export const login = (username, password) => axios({
    url: "/users/login",
    method: "post",
    data: {
        username,
        password
    }
})


//获取登入日志
export const getLoginLog = () => axios.get("/getloginlog")

//获取权限菜单
export const getMenuList = () => axios.get("/permission/getMenuList")
