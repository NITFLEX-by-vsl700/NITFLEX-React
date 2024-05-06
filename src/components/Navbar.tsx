import "./Navbar.css"
import profileSettings from "../assets/profile_settings.svg"
import regNewUser from "../assets/reg_new_user.svg"
import manageUsers from "../assets/manage_users.svg"
import manageMovies from "../assets/manage_movies.svg"
import logout from "../assets/logout.svg"
import cross from '../assets/cross.svg'

export const Navbar = (props: {closeable?: boolean, onClose?: Function}) => {
    return (
        <div className='Navbar'>
            <div className="Navbar-head">
                <NavHeading />
                {props.closeable && 
                    <CloseButton onClick={() => {if(props.onClose !== undefined) props.onClose()}} />}
            </div>
            <hr />
            <NavOption imageSrc={profileSettings}>Profile settings</NavOption>
            <NavOption imageSrc={regNewUser}>Register new user</NavOption>
            <NavOption imageSrc={manageUsers}>Manage users</NavOption>
            <NavOption imageSrc={manageMovies}>Manage movies</NavOption>
            <hr />
            <NavOption imageSrc={logout}>Log out</NavOption>
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

const NavOption = (props: {imageSrc: string, children: string}) => {
    return (
        <div className="Navbar-option">
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