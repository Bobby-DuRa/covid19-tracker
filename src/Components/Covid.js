import React, { useEffect,useState } from 'react'
import './covid.css';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';


const Covid = () =>{
    const [data, setData] = useState([]);
    const getCovidData = async () =>
     {
        try{
            const res = await fetch('https://api.covid19api.com/summary');
            const actualData = await res.json();
            const re = actualData.Countries[121];
            setData(re);    
             }
        catch(err)
        {
            console.log(err);
        }   
    }

     useEffect(()=>{  getCovidData(); }, []);               

  return ( <>    <h1> Live </h1>
                <h2> Corona Virus 🦠 Tracker🤒  </h2>
     <ul>
        <li className = "main">       
            <div className = "main_inner">   <h3> Nepal Total Case</h3>
                <strong className="date_cs"><EventAvailableIcon className="date_icon"/>&nbsp;{data.Date}</strong>  
              <div className="row"  >
                <p className="main_total"> <span>< AcUnitIcon className= "confirm_icon"/>&nbsp;Total Confirmed:&nbsp;{data.TotalConfirmed}</span></p>
                <p className="main_total"> <span><AccessibilityNewIcon className= "recover_icon"/>&nbsp;Total Recovered:&nbsp;{data.TotalRecovered}</span></p>
                <p className="main_total"> <span><PersonAddDisabledIcon className="death_icon"/>&nbsp;Total Deaths: &nbsp;{data.TotalDeaths}</span></p>                   
             </div>
            </div>          
        </li>
     </ul> 
  </>
  )
}

export default Covid