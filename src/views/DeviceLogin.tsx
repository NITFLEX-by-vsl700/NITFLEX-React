import { useState } from "react";
import { NoLayout } from "../components/NoLayout"
import { SetToken } from "../utils/Token";
import { PostRequest } from "../utils/Requests";
import { backendUrl } from "../globals";
import { NitflexError } from "../models/NitflexError";

export const DeviceLogin = () => {
    const [deviceName, setDeviceName] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const success = (data: string) => {
        setError(false);
        
        SetToken(data);
        window.location.href = "/";
    }

    const failure = (error: any) => {
        console.log(error)
        
        let nitflexError: NitflexError = error.response.data;
        setErrorMessage(nitflexError.nitflexErrorMessage);

        setError(true)
    }

    const onLogin = () => {
        PostRequest(backendUrl + "/login/deviceName", {
            deviceName: deviceName
        })
        .then(response => response.data)
        .then(success)
        .catch(failure)
    }

    return (
        <NoLayout>
            <div className="Nitflex-form">
                { error && <div className="Form-error"> <p>{errorMessage}</p> </div> }
                <label htmlFor="deviceName">Device name:</label>
                <input type="text" name="deviceName" id="deviceName" onChange={e => setDeviceName(e.target.value)} />
                <button className="Submit-button nitflex-button" onClick={e => onLogin()}>Submit</button>
            </div>
        </NoLayout>
    )
}