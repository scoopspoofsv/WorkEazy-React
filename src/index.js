import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SideNav from './components/general/SideNav';
import Requests from './components/requests';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Seat from './components/requests/Seat';
import Meal from './components/requests/Meal';
import Transport from './components/requests/Transport';
import Accomodation from './components/requests/Accomodation';
import './scss/main.scss';
import bgImage from './assets/images/backgroundimage.webp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <SideNav />
    <div className='background-image'>
      <img src={bgImage} alt="bgImage" />
    </div>
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Requests />} />
        <Route path="seats" element={ <Seat/> } />
        <Route path="meal" element={ <Meal/> } />
        <Route path="transport" element={ <Transport/> } />
        <Route path="accomodation" element={ <Accomodation/> } />
      </Routes>
    </div>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
