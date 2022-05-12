import React, {useState, useEffect} from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import Seat from './Seat';
import Meal from './Meal';
import Transport from './Transport';
import Accomodation from './Accomodation';
import axios from "axios";

const Requests = () => {

    const [data, setData] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() =>{
        fetchData();
    }, []);

    const fetchData = async () => {
        let response =await axios.get('https://cors-anywhere.herokuapp.com/http://13.235.222.151:8180/workeazy/v1/booking/requests',{
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        response && setData(response);
    }

    return(
        <main>
            <div className="requests-main-window">
                <div className="header">
                    <h3>Requests</h3>
                </div>
                <Tabs onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>
                            <div className={tabIndex === 0 ? 'active' : ''}>
                                Seat Booking
                                <div className="counter">{data && data.data && data.data.data && data.data.data.seatRequests}</div>
                            </div>
                        </Tab>
                        <Tab>
                            <div className={tabIndex === 1 ? 'active' : ''}>
                                Meal Booking
                                <div className="counter">{data && data.data && data.data.data && data.data.data.mealRequests}</div>
                            </div>
                        </Tab>
                        <Tab>
                            <div className={tabIndex === 2 ? 'active' : ''}>
                                Transport Booking
                                <div className="counter">{data && data.data && data.data.data && data.data.data.transportRequests}</div>
                            </div>
                        </Tab>
                        <Tab>
                            <div className={tabIndex === 3 ? 'active' : ''}>
                                Accomodation Booking
                                <div className="counter">{data && data.data && data.data.data && data.data.data.accommodationRequests}</div>
                            </div>
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <Seat />
                    </TabPanel>
                    <TabPanel>
                        <Meal />
                    </TabPanel>
                    <TabPanel>
                        <Transport />
                    </TabPanel>
                    <TabPanel>
                        <Accomodation />
                    </TabPanel>
                </Tabs>
            </div>
        </main>
    );
}
export default Requests;