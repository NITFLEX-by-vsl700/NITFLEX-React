import './Header.css'
import logo from '../assets/nitflex_full_logo.svg'
import menu from '../assets/menu.svg'
import { Navbar } from './Navbar'
import { useState } from 'react'

export const Header = (props: {navbar?: boolean}) => {
    const [navbarToggled, setNavbarToggled] = useState(false);

    const toggleNavbar = () => {
        setNavbarToggled(!navbarToggled);
    }

    return (
        <div>
            {props.navbar && 
                <div className={`Navbar-container${navbarToggled ? '' : ' Navbar-container-hidden'}`}>
                    <Navbar closeable={true} onClose={toggleNavbar} />
                </div>
            }
            <div className='Header'>
                <button className='Header-menu-button nitflex-button' hidden={!props.navbar} onClick={toggleNavbar}>
                    <img src={menu} alt="" />
                </button>
                <img className='Header-logo nitflex-button' src={logo} alt="" />
                <form className='Header-movie-request'>
                    <input type="url" name="link" id="movie-request-link" placeholder='Request a movie...' />
                </form>
            </div>
        </div>
    )
}
