import React, { useState, useEffect } from 'react'

import BarChart from './BarChart'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { time, amount } = useAppContext()
  console.log(amount.length);


  let data = [];
  let totalAmount = 0;
  for(let i=0;i<amount.length;i++){
    if(i===0){
        totalAmount = totalAmount + amount[i];
    }
    else if(time[i]===time[i-1]){
        totalAmount= totalAmount+amount[i]
        console.log(i);
        
    }
    else{
        totalAmount = totalAmount + amount[i];
        data.push({ date: time[i-1], count: totalAmount, pv: 2400, amt: 2400 });
        totalAmount=0 
    }
    if(i === amount.length - 1){
        totalAmount = totalAmount + amount[i];
        data.push({
          date: time[i],
          count: totalAmount,
          pv: 2400,
          amt: 2400,
        });
        totalAmount = 0; 
    }
    
    // }else if(time[i]===time[i+1]){
    //     totalAmount = totalAmount + amount[i];
        
    // }else if (i === time.length-1) {
    //   totalAmount = totalAmount + amount[i];
    //   data.push({ date: time[i], count: totalAmount, pv: 2400, amt: 2400 });
    //   totalAmount = 0;
    // } else {
    //   totalAmount = totalAmount + amount[i];
    //   data.push({ date: time[i - 1], count: totalAmount, pv: 2400, amt: 2400 });
    //   totalAmount = 0;
    // }
  }
  return (
    <Wrapper>
      <h4>Transactions</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer

