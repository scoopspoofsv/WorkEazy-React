import React from "react";
import { Link } from "react-router-dom";
import './style.scss';
import logo from '../../../assets/images/logo-svg.png';
import adminIcon from '../../../assets/images/admin-icon.jpeg';

const SideNav = () => {
    return(
        <div className="side-nav">
            <div class="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="links">
                {/* <Link to="dashboard"><i class="fa-solid fa-table-columns"></i> Dashboard</Link> */}
                <Link to="requests" className="active"><i class="fa-solid fa-check-to-slot"></i> Requests</Link>
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
        </div>
    );
}
export default SideNav;