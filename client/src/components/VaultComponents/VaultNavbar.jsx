import "../../styles/VaultNavbar.css"
import {Link} from 'react-router-dom'
import { useState} from "react"
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCaretDown, FaCaretUp} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const VaultNavbar = () => {

    const [showNav, setShowNav] = useState("hide")
    const [bars, setBars] = useState(true)
    const [extraMenu, setExtraMenu] = useState(false)
    const [caret, setCaret] = useState("down")

    const toggleNav = ()=>{
        if(showNav==="hide"){
            setShowNav("show");
            setBars(false)
        }
        else{
            setShowNav("hide");
            setBars(true)
        }
    }
    const extraMenuToggle = ()=>{
        if (extraMenu===true) {
            setCaret("down");
            setExtraMenu(false);
        }
        else{
            setCaret("up");
            setExtraMenu(true)
        }
    }

    return (
        <>  
        <nav className="nav">
            <div className="nav__brand">
                <Link to='/vault-home'>PVA</Link>
                <span onClick={()=>toggleNav()}>{bars ===true ? < FaBars/> : <FaTimes/>}</span>
            </div>
            <div className={`nav__links ${showNav}`}>
                <ul>
                    <li onClick={()=>toggleNav()}><Link to='/vault-home'>Home</Link></li>
                    <li onClick={()=>toggleNav()}><Link to='/vault-create'>Add</Link></li>
                    <div className="extra__menu">
                    <li onClick={()=>extraMenuToggle()}>Dashboard {caret==="down" ? <FaCaretDown />: <FaCaretUp />}
                        {extraMenu && 
                        <ul>
                            <div className="toggle--extra__menu">
                                <li className="user__name"><Link to='#'>@ {localStorage.getItem('user')}</Link></li>
                                <li><Link to='#'><FaUser/> Profile</Link></li>
                                <li><Link to='/settings'><IoSettings /> Settings</Link></li>
                                <li><Link to='/logout'><FaSignOutAlt /> Logout</Link></li>
                            </div>
                        </ul>
                        }
                    </li>
                    </div>
                </ul>  
            </div>
        </nav>
        </> 
    );
}

export default VaultNavbar;
