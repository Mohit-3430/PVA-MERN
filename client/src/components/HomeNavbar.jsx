import '../styles/HomeNavbar.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'

const HomeNavbar = () => {

    const [showNav, setShowNav] = useState("hide")
    const [bars, setBars] = useState("fa-bars")

    const toggleNav = ()=>{
        if(showNav==="hide"){
            setShowNav("show");
            setBars("fa-times")
        }
        else{
            setShowNav("hide");
            setBars("fa-bars")
        }        
    }

    return (
        <>
        <nav className='nav'>
            <div className='nav__links nav__brand'>
                <Link to='/'>PVA</Link>
                <i onClick={()=>toggleNav()} className={`fas ${bars}`}></i>
            </div>
            <div className={`nav__links ${showNav}`}>
                <ul>
                    <li onClick={()=>toggleNav()}><Link to='/login'>LOGIN</Link></li>
                    <li onClick={()=>toggleNav()}><Link  to='/signup'>REGISTER</Link></li>
            </ul> 
            </div> 
            </nav>
        </> 
    );
}

export default HomeNavbar