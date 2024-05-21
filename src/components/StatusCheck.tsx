import React from "react"
import axios from 'axios'
import { backendUrl } from "../globals"

const StatusCheck = (props: {children: React.ReactElement | React.ReactElement[]}) => {
    const loginHref = "/login"
    const welcomeHref = "/welcome"

    axios.get(backendUrl + '/userStatus', { withCredentials: true })
        .then(response => response.data)
        .then(json => {
            if(json.status === "unauthenticated"){
                if(window.location.pathname !== loginHref) window.location.href = loginHref
            }else if(json.status === "no-users"){
                if(window.location.pathname !== welcomeHref) window.location.href = welcomeHref
            }else if(window.location.pathname === welcomeHref
                || window.location.pathname === loginHref) window.location.href = "/"
        })
    
    return (
        <>{props.children}</>
    )
}

export default StatusCheck