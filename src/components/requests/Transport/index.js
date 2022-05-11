import React, {useState, useEffect} from "react";
import DatePicker from 'react-date-picker';
import axios from "axios";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const Transport = () => {

    const [fromValue, setFromValue] = useState(moment().startOf('month').subtract(4, 'months')._d);
    const [toValue, setToValue] = useState(moment().endOf('month')._d);
    const [data, setData] = useState(null);
    const [headers, ] = useState({headers: {
        "X-Requested-With": "XMLHttpRequest",
    },});

    const history = useNavigate();


    const onDateChange = (value, type) => {
        type === 'from' && setFromValue(value);
        type === 'to' && setToValue(value);
    }

    useEffect(() => {
        const fetchDataChange = async () => {
            let response =await axios.post('https://cors-anywhere.herokuapp.com/http://13.235.222.151:8180/workeazy/v1/bookings',{
                bookingType: "TRANSPORT",
                fromDate: moment(fromValue).format('DD-MMM-YYYY'),
                toDate: moment(toValue).format('DD-MMM-YYYY'),
            }, headers);
            response && setData(response);
        }
        fromValue!==0 && toValue !== 0 && fetchDataChange();
    },[fromValue, toValue, headers]);

    return (
        <div className="requests-main-window">
            <div className="header">
                <h3 >Requests</h3><span> / </span>
                <p>Transport Booking Requests</p>
            </div>
            <div className="seat-requests">
                <div className="date-pickers">
                    <a href="/#" className="back-button" onClick={history.goBack}>
                        <i className="fa-solid fa-arrow-left back"></i> Back
                    </a>
                    <p>Select Date:</p>
                    <div className="date-container">
                        <div className="from">
                            <p>From :</p>
                            <DatePicker onChange={(value) => onDateChange(value, 'from')} value={fromValue} format={'dd-MM-y'} />
                        </div>
                        <div className="from">
                            <p>To :</p>
                            <DatePicker onChange={(value) => onDateChange(value, 'to')} value={toValue} format={'dd-MM-y'} />
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    {data && data.data && data.data.data && Array.isArray(data.data.data.transportRecords) && data.data.data.transportRecords.length > 0 ?<div className="table transport">
                        <div className="heading row">
                            <p>Name</p>
                            <p>Email Address</p>
                            <p>Contact Number</p>
                            <p>Pickup</p>
                            <p>Return Journey</p>
                            <p>Pickup Time</p>
                            <p>Drop Time</p>
                        </div>
                        {data.data.data.transportRecords.map((item) => (
                            <div className="row">
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                                <p>{item.mobileNumber}</p>
                                <p>{item.pickUpLocation}</p>
                                <p>{item.optReturnJourney ? 'Yes' : 'No'}</p>
                                <p>{item.pickUptime}</p>
                                <p>{item.returnTime}</p>
                            </div>
                        ))}
                    </div> : <div className="nodata">No data found</div>}
                </div>
            </div>
        </div>
    );
}

export default Transport;