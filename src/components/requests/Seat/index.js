import React, {useState, useEffect} from "react";
import DatePicker from 'react-date-picker';
import axios from "axios";
import moment from "moment";

const Seat = () => {
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let response =await axios.post('http://13.235.222.151:8180/workeazy/v1/bookings',{
            bookingType: "SEAT",
            fromDate: "01-Jan-2022",
            toDate: "31-May-2022",
        });
        response && setData(response);
    }

    const fetchDataChange = async () => {
        let response =await axios.post('http://13.235.222.151:8180/workeazy/v1/bookings',{
            bookingType: "SEAT",
            fromDate: moment(fromValue).format('DD-MMM-YYYY'),
            toDate: moment(toValue).format('DD-MMM-YYYY'),
        });
        response && setData(response);
    }

    const onDateChange = (value, type) => {
        type === 'from' && setFromValue(value);
        type === 'to' && setToValue(value);
    }

    useEffect(() => {
        fromValue!==0 && toValue !== 0 && fetchDataChange();
    },[toValue]);

    return (
        <div className="requests-main-window">
            <div className="header">
                <h3>Requests</h3>
            </div>
            <div className="seat-requests">
                <div className="title">
                    <a href="javascript:history.back()">
                        <i className="fa-solid fa-arrow-left back"></i>
                    </a>
                    Seat Booking Requests
                </div>
                <div className="date-pickers">
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
                {data && data.data && data.data.data && Array.isArray(data.data.data.seatAvailabilityRecords) ? <div className="table seats">
                    <div className="heading row">
                        <p>Name</p>
                        <p>Email Address</p>
                        <p>Contact Number</p>
                        <p>No. of Seats</p>
                        <p>Floor</p>
                        <p>Zone</p>
                    </div>
                    {data.data.data.seatAvailabilityRecords.map((item) => (
                        <div className="row">
                            <p>{item.name}</p>
                            <p>{item.email}</p>
                            <p>{item.mobileNumber}</p>
                            <p>{item.seats}</p>
                            <p>{item.floor}</p>
                            <p>{item.zone}</p>
                        </div>
                    ))}
                </div> : <div className="nodata">No data found</div>}
            </div>
        </div>
    );
}

export default Seat;