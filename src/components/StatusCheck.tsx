import React from "react"
import { backendUrl } from "../globals"
import { GetRequest } from "../utils/Requests"
import { ClearToken } from "../utils/Token"

const StatusCheck = (props: {children: React.ReactElement | React.ReactElement[]}) => {
    const loginHref = "/login"
    const deviceNameHref = "/login/deviceName"
    const welcomeHref = "/welcome"
    const bannedHref = "/banned"

    GetRequest(backendUrl + '/userStatus')
        .then(response => response.data)
        .then(json => {
            if(json.status === "unauthenticated"){
                if(window.location.pathname !== loginHref) window.location.href = loginHref
            }else if(json.status === "no-users"){
                if(window.location.pathname !== welcomeHref) window.location.href = welcomeHref
            }else if(json.status === "no-device-name"){
                if(window.location.pathname !== deviceNameHref) window.location.href = deviceNameHref
            }else if(window.location.pathname === welcomeHref
                || window.location.pathname === loginHref
                || window.location.pathname === bannedHref) window.location.href = "/"
        }).catch(error => {
            if(error.response.status === 403){ // BANNED
                if(window.location.pathname !== bannedHref) window.location.href = bannedHref
            }else if(error.response.status === 401){ // Some other reason to not let you in (e.g. deleted user)
                ClearToken();
                window.location.href = loginHref;
            }
        })
    
    return (
        <>{props.children}</>
    )
}

export default StatusCheck