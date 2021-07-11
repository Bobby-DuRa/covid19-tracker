import React, { useEffect, useState } from 'react'
import './covid.css';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


//For greeting
let currDate = new Date().getHours();
let greeting = "";


if (currDate >= 1 && currDate < 12) {
    greeting = "Good Morning ! ";
}
else if (currDate >= 12 && currDate < 20) {
    greeting = "Good Evening !";
}
else {
    greeting = " Good Night ! ";
}

let newdate = new Date().toLocaleDateString(); //for date
let digitime = new Date().toLocaleTimeString(); //for digital clock time

//fetching api // used react hook (usestate,useeffect)
const Covid = () => {
    const [data, setData] = useState([]);
    const [ctime, settime] = useState(digitime);

    const updatetime = () => {
        digitime = new Date().toLocaleTimeString();
        settime(digitime);
    }
    setInterval(updatetime, 1000);

    const getCovidData = async () => {
        try {
            const res = await fetch('https://api.covid19api.com/summary');
            const actualData = await res.json();
            const re = actualData.Countries[121];
            setData(re);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { getCovidData(); }, []);

    return (<>    <h1> Live </h1>
        <h2> {greeting} </h2>
        <h3> Corona Virus 🦠 Tracker🤒  </h3>
        <ul>
            <li className="main">
                <div className="main_inner">   <h4> Nepal Overview</h4>
                    <strong className="date_cs"><EventAvailableIcon className="date_icon" />{newdate}</strong>
                    <strong className="date_cs"><AccessTimeIcon className="time_icon" />{ctime}</strong>
                    <div className="row"  >
                        <p className="main_total"> <span>< AcUnitIcon className="confirm_icon" />Total Confirmed: {data.TotalConfirmed}</span></p>
                        <p className="main_total"> <span><AccessibilityNewIcon className="recover_icon" />Total Recovered: {data.TotalRecovered}</span></p>
                        <p className="main_total"> <span><PersonAddDisabledIcon className="death_icon" /> Total Deaths : {data.TotalDeaths}</span></p>
                    </div>
                </div>
            </li>
        </ul>
    </>
    )
}

export default Covid