import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Requests = () => {

    const [data, setData] = useState(null);

    useEffect(() =>{
        fetchData();
    }, []);

    const fetchData = async () => {
        let response =await axios.get('http://13.235.222.151:8180/workeazy/v1/booking/requests',{
        });
        response && setData(response);
    }

    return(
        <main>
            <div className="requests-main-window">
                <div className="header">
                    <h3>Requests</h3>
                </div>
                <ul className="all-options">
                    <li>
                        <Link to="seats">
                            Seat Booking Requests
                            <div className="counter">{data && data.data && data.data.data && data.data.data.seatRequests}</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="meal">
                            Meal Booking Requests
                            <div className="counter">{data && data.data && data.data.data && data.data.data.mealRequests}</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="transport">
                            Transport Booking Requests
                            <div className="counter">{data && data.data && data.data.data && data.data.data.transportRequests}</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="accomodation">
                            Accomodation Booking Requests
                            <div className="counter">{data && data.data && data.data.data && data.data.data.accommodationRequests}</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </main>
    );
}
export default Requests;