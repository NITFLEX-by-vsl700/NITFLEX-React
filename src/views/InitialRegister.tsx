import { useState } from "react";
import { NoLayout } from "../components/NoLayout"
import { backendUrl } from "../globals";
import { PostRequest } from "../utils/Requests";
import { SetToken } from "../utils/Token";

export const InitialRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [deviceLimit, setDeviceLimit] = useState(3);
    const [role, setRole] = useState("ROLE_OWNER");
    const [error, setError] = useState(false);

    const success = (data: string) => {
        setError(false);

        SetToken(data);
        window.location.href = "/login/deviceName";
    }

    const failure = (error: any) => {
        console.log(error)
        // if(error.response && error.response.status === 302 && error.response.location === `${backendUrl}/`){
        //     success()
        //     return
        // }

        setError(true)
    }

    const onRegister = () => {
        PostRequest(backendUrl + "/welcome", {
            username: username,
            password: password,
            role: role,
            deviceLimit: deviceLimit
        })
        .then(response => response.data)
        .then(success, failure)
    }

    return (
        <NoLayout>
            <div className="Nitflex-form">
                { error && <div className="Form-error"> <p>Registration failed!</p> </div> }
                <h1>Welcome!</h1>
                <h3>Be the Owner of this server!</h3>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                <label htmlFor="role">User role:</label>
                <select name="role" id="role" defaultValue={role} disabled onChange={e => setRole(e.target.value)}>
                    <option value="ROLE_OWNER">Owner</option>
                    <option value="ROLE_USER">User</option>
                </select>
                <label htmlFor="devlimit">Device limit:</label>
                <input type="number" name="devlimit" id="device-limit" min={1} defaultValue={deviceLimit} onChange={e => setDeviceLimit(parseInt(e.target.value))} />
                <button className="Submit-button nitflex-button" onClick={() => onRegister()}>Register</button>
            </div>
        </NoLayout>
    )
}