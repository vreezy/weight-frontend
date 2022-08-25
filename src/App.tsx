import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import data from './output.json';

function App() {
  return (

<div style={{width: "96vw", height:"96vh"}}>
    <ResponsiveContainer width="100%" height="100%">
    <LineChart
      id="render-svg"
      // width={1200}
      // height={600}
      data={data}
      //margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="datetime" type='category' angle={90}/>
      <YAxis unit="kg" domain={['dataMin', 'dataMax']} min={70} max={70}/>
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone"  dataKey="weight" stroke="#ff7300" yAxisId={0} />
      {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
    </LineChart>
    </ResponsiveContainer>
    </div>
  );
}

export default App;
