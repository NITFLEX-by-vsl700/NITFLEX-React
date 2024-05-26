import "./Navbar.css"
import profileSettings from "../assets/profile_settings.svg"
import regNewUser from "../assets/reg_new_user.svg"
import manageUsers from "../assets/manage_users.svg"
import manageMovies from "../assets/manage_movies.svg"
import logout from "../assets/logout.svg"
import cross from '../assets/cross.svg'
import axios from "axios"
import { backendUrl } from "../globals"

export const Navbar = (props: {closeable?: boolean, onClose?: Function}) => {
    const onRegisterNewUser = () => {
        window.location.href = '/settings/users/new'
    }

    const onLogOut = () => {
        axios.get(backendUrl + '/logout', { withCredentials: true })
            .then(() => window.location.href = '/login')
    }

    return (
        <div className='Navbar'>
            <div className="Navbar-head">
                <NavHeading />
                {props.closeable && 
                    <CloseButton onClick={() => {if(props.onClose !== undefined) props.onClose()}} />}
            </div>
            <hr />
            <NavOption imageSrc={profileSettings} onClick={() => {}}>Profile settings</NavOption>
            <NavOption imageSrc={regNewUser} onClick={onRegisterNewUser}>Register new user</NavOption>
            <NavOption imageSrc={manageUsers} onClick={() => {}}>Manage users</NavOption>
            <NavOption imageSrc={manageMovies} onClick={() => {}}>Manage movies</NavOption>
            <hr />
            <NavOption imageSrc={logout} onClick={onLogOut}>Log out</NavOption>
        </div>
    )
}

const NavHeading = () => {
    return (
        <div className="Navbar-heading">
            <p className="Navbar-username">vsl700</p>
            <p className="Navbar-role">Owner</p>
        </div>
    )
}

const NavOption = (props: {imageSrc: string, onClick: Function, children: string}) => {
    return (
        <div className="Navbar-option" onClick={() => props.onClick()}>
            <img className="Navbar-option-image" src={props.imageSrc} alt="Option icon" />
            <p className="Navbar-option-text">{props.children}</p>
        </div>
    )
}

const CloseButton = (props: {onClick: Function}) => {
    return (
        <button className="Navbar-close-button" onClick={() => props.onClick()}><img src={cross} alt="Close navbar" /></button>
    )
}