import React, {useState, useEffect} from "react";
import DatePicker from 'react-date-picker';
import axios from "axios";
import moment from "moment";
import LoadingShimmer from "../../general/LoadingShimmer";

const Transport = () => {

    const [fromValue, setFromValue] = useState(moment().startOf('month').subtract(4, 'months')._d);
    const [toValue, setToValue] = useState(moment().endOf('month')._d);
    const [data, setData] = useState(null);
    const [headers, ] = useState({headers: {
        "X-Requested-With": "XMLHttpRequest",
    },});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        error: false,
        message: '',
    });


    const onDateChange = (value, type) => {
        type === 'from' && setFromValue(value);
        type === 'to' && setToValue(value);
    }

    useEffect(() => {
        const fetchDataChange = async () => {
            setLoading(true);
            setError({
                error: false,
                message: '',
            });
            try {
                const response = await axios.post('https://cors-anywhere.herokuapp.com/http://13.235.222.151:8180/workeazy/v1/bookings',{
                    bookingType: "SEAT",
                    fromDate: moment(fromValue).format('DD-MMM-YYYY'),
                    toDate: moment(toValue).format('DD-MMM-YYYY'),
                }, headers);
                // wait for json to be ready
                response && setData(response);
                setLoading(false);
                // console.log(product.data.attributes)
              } catch (e) {
                setLoading(false);
                setError({
                    error: true,
                    message: e.message,
                });
              }
        }

        fromValue!==0 && toValue !== 0 && fetchDataChange();
    },[fromValue, toValue, headers]);

    return (
        <div className="requests-main-window">
            <div className="seat-requests">
                <div className="date-pickers">
                    <div className="date-container">
                    <div className="from">
                            <p>From Date:</p>
                            <DatePicker onChange={(value) => onDateChange(value, 'from')} value={fromValue} format={'dd-MM-y'} className="date-inputs"/>
                        </div>
                        <div className="from">
                            <p>To Date:</p>
                            <DatePicker onChange={(value) => onDateChange(value, 'to')} value={toValue} format={'dd-MM-y'} className="date-inputs"/>
                        </div>
                    </div>
                </div>
                {loading && <LoadingShimmer />}
                {!loading && !error.error && <div className="table-container">
                    {!loading && !error.error && data && data.data && data.data.data && data.data.data.transportRecords && data.data.data.transportRecords.length > 0 ? <div className="table transport">
                        <div className="heading row">
                            <p>Name</p>
                            <p>Email Address</p>
                            <p>Contact Number</p>
                            <p>Pickup</p>
                            <p>Return Journey</p>
                            <p>Pickup Time</p>
                            <p>Drop Time</p>
                        </div>
                        {data.data.data.transportRecords.map((item, index) => (
                            <div className="row" key={index}>
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
                </div>}
                {error.error && <div className="nodata">An error occured in fetching data : {error.message}</div>}
            </div>
        </div>
    );
}

export default Transport;