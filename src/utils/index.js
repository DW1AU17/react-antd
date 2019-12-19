export const getToken = () => localStorage.getItem("TOKEN")

export const setToken = token => localStorage.setItem('TOKEN', token)

export const removeToken = () => localStorage.removeToken("TOKEN")

export const isLogin = () => !!getToken()