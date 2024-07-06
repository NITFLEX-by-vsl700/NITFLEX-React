export const GetToken = () => window.localStorage.getItem("auth")
export const SetToken = (newToken: string) => { window.localStorage.setItem("auth", newToken) }
export const ClearToken = () => { window.localStorage.removeItem("auth") }