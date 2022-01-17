import VaultNavbar from "../VaultNavbar"
import TwoStepLogin from "./TwoStepLogin"
import "../../../styles/Settings.css"
import { Link } from "react-router-dom"

const Settings2Fa = () => {

    return (
        <>
        <VaultNavbar />
        <section className="settings__container"> {/*Grid*/}
        <div>
            <div className="settings__menu">
                <div className="settings__menu--header">
                    <p>Settings</p>   
                    <hr />
                </div>
                <ul className="settings">
                <li><Link to="/settings/myaccount">My account</Link></li>
                <li><Link to="/settings/2fa">Two-Step Login</Link></li>
                <li><Link to="/settings/irreversible-action">Irreversible Actions</Link></li>
                <li>Options</li>
                </ul>
            </div>
            </div>
            <section className="settings-section__container">
                <TwoStepLogin />
            </section>
        </section>
        </>
    )
}

export default Settings2Fa;