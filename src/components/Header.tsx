import './Header.css'
import logo from '../assets/nitflex_full_logo.svg'
import menu from '../assets/menu.svg'
import { Navbar } from './Navbar'
import { useState } from 'react'
import { backendUrl } from '../globals'
import { PostRequest } from '../utils/Requests'

export const Header = (props: {navbar?: boolean}) => {
    const [navbarToggled, setNavbarToggled] = useState(false);
    const [requestInput, setRequestInput] = useState('');
    const [requestSubmitActive, setRequestSubmitActive] = useState(true);

    const toggleNavbar = () => {
        setNavbarToggled(!navbarToggled);
    }

    const onHomeButtonClick = () => {
        window.location.href = '/';
    }

    const onRequestButtonClick = () => {
        setRequestSubmitActive(false);

        PostRequest(backendUrl + `/request`, {url: requestInput})
            .then(() => alert("Request sent!"))
            .catch(() => alert("Request failed!"))
            .finally(() => setRequestSubmitActive(true))
    }

    return (
        <div>
            {props.navbar && 
                <div className={`Navbar-container${navbarToggled ? '' : ' Navbar-container-hidden'}`}>
                    <Navbar closeable onClose={toggleNavbar} />
                </div>
            }
            <div className='Header'>
                <button className='Header-menu-button nitflex-button' hidden={!props.navbar} onClick={toggleNavbar}>
                    <img src={menu} alt="" />
                </button>
                <img className='Header-logo nitflex-button' src={logo} alt="" onClick={() => onHomeButtonClick()} />
                <div className='Header-movie-request'>
                    <input type="url" name="link" id="movie-request-link" placeholder='Request a movie...' onChange={e => setRequestInput(e.target.value)} />
                    <button className={`Movie-request-button nitflex-button${requestSubmitActive ? '' : ' disabled'}`} onClick={() => onRequestButtonClick()} disabled={!requestSubmitActive}>Submit</button>
                </div>
            </div>
        </div>
    )
}
