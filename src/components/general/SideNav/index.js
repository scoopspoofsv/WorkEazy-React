import React, {useState} from "react";
import { Link } from "react-router-dom";
import './style.scss';
import logo from '../../../assets/images/logo-svg.png';
import adminIcon from '../../../assets/images/admin-icon.jpeg';

const SideNav = () => {

    const [open, setOpen] = useState(false);

    return(
        <div className={open ? 'side-nav' : 'side-nav closed'}>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="links">
                {/* <Link to="dashboard"><i class="fa-solid fa-table-columns"></i> Dashboard</Link> */}
                <Link to="/" className="active"><i className="fa-solid fa-check-to-slot"></i> Requests</Link>
            </div>
            <div className="footer">
                <div className="admin">
                    <div className="icon">
                        <img src={adminIcon} alt="" />
                    </div>
                    <div className="details">
                        <div className="name">Kautilya Sundriyal</div>
                        <div className="designation">Admin</div>
                    </div>
                </div>
            </div>
            <div className="hamburger" onClick={() => setOpen(!open)}>
                <i className="fa-solid fa-bars"></i>
            </div>
        </div>
    );
}
export default SideNav;