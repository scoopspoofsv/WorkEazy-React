import React, {useState, useEffect} from "react";
import DatePicker from 'react-date-picker';
import {useNavigate} from "react-router-dom";
  
import axios from "axios";
import moment from "moment";

const Accomodation = () => {

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
                bookingType: "ACCOMMODATION",
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
                <p>Accomodation Booking Requests</p>
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
                    {data && data.data && data.data.data && Array.isArray(data.data.data.accommodationRecords) && data.data.data.accommodationRecords.length > 0 ? <div className="table seats">
                        <div className="heading row">
                            <p>Name</p>
                            <p>Email Address</p>
                            <p>Contact Number</p>
                            <p>From Date</p>
                            <p>To Date</p>
                        </div>
                        {data.data.data.accommodationRecords.map((item) => (
                            <div className="row">
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                                <p>{item.mobileNumber}</p>
                                <p>{item.fromDate}</p>
                                <p>{item.toDate}</p>
                            </div>
                        ))}
                    </div> : <div className="nodata">No data found</div>}
                </div>
            </div>
        </div>
    );
}

export default Accomodation;