import axios from "axios"

export const login = (username, password) => axios({
    url: "/user/login",
    method: "post",
    data: {
        username,
        password
    }
})