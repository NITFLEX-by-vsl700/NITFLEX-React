import { useState } from "react"
import { NoLayout } from "../components/NoLayout"
import { backendUrl } from "../globals"
import { PostRequest } from "../utils/Requests"
import { SetToken } from "../utils/Token"

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const success = (data: string) => {
        setError(false);
        
        SetToken(data);
        window.location.href = "/";
    }

    const failure = (error: any) => {
        console.log(error)
        // if(error.response && error.response.status === 302 && error.response.location === `${backendUrl}/`){
        //     success()
        //     return
        // }

        setError(true)
    }

    const onLogin = () => {
        PostRequest(backendUrl + "/login", {
            username: username,
            password: password
        })
        .then(response => response.data)
        .then(success)
        .catch(failure)
    }

    return (
        <NoLayout>
            <div className="Nitflex-form">
                { error && <div className="Form-error"> <p>Login failed!</p> </div> }
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
                <button className="Submit-button nitflex-button" onClick={e => onLogin()}>Login</button>
            </div>
        </NoLayout>
    )
}