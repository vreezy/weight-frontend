import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';

import data from './output.json';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface IData {
  index: number;
  datetime: string;
  weight: number;
  mark: string;
}

interface ICustomTooltipProps {
  active: any;
  payload: any;
  label: any;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {

  if (active) {
    console.log(payload)
    return (
      <div style={{padding: "10px", backgroundColor: "white", border: "2px, black, solid"}}>

    <ul className="list-group list-group-flush">
      <li className="list-group-item">{label}</li>
      <li className="list-group-item">{payload?.[0]?.value} kg</li>
      <li className="list-group-item">{payload?.[0]?.payload?.datetime ? new Date(payload?.[0]?.payload?.datetime).toLocaleDateString() : ""}</li>

    </ul>
  
      </div>
    );
  }

  return null;
};


function App() {

  const [filteredData, setFilteredData] = React.useState<IData[]>([]);
  const [filterIndex, setFilterIndex] = React.useState<number>(0);

  const [menuVisible, setMenuVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
  
    const filteredData = data.filter(item => {
      if (item.index >= filterIndex) {
        return true;
      }
      return false;
    });    

    setFilteredData(filteredData as IData[])
  },[filterIndex]);

  const handleMenuClick = (index: number): void => {
    setFilterIndex(index);
    setMenuVisible(false);
  }

  const marks = data.filter(item => {
    if (item.mark) {
      return true;
    }
    return false;
  });

  return (


    <div className="container-fluid"
     style={{ width: "98vw", height: "94vh" }}


    >

      <div
        style={{
          position: "absolute",
          zIndex: 10000,
          right:0,
          top:0,
          padding: "10px"
        }}
      >
        <button type="button" className="btn btn-outline-primary" onClick={() => setMenuVisible(oldValue => !oldValue)}>Menu</button>
      </div>
      
      {menuVisible &&
      <div className="d-flex justify-content-center" style={{marginTop: "10px"}}>
        <div className="btn-group-vertical">
        {marks.map((item, index)=> {
          return (
            <button key={Math.random()} type="button" className={ item.index === filterIndex ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => handleMenuClick(item.index)} >{item.mark} - start: {new Date(item?.datetime).toLocaleDateString()}</button>
          )
        })}     
        </div>
        </div>
      }

      {!menuVisible &&
      <ResponsiveContainer
        // debounce={0}
        width="100%" height="100%"
      >
        <LineChart
          id="render-svg"
          // width={1200}
          // height={600}
          data={filteredData}
        //margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <XAxis dataKey="index" label={{ position: 'bottom' }} />
          <YAxis unit="kg" domain={['dataMin', 'dataMax']} min={70} max={70} />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          {marks.map((mark, index) => {
            return <ReferenceLine key={Math.random()} x={mark.index} label={{ position: 'right', angle: -90, value: mark?.mark ? mark.mark : "", fill: 'red', fontSize: 14 }} stroke="red" />
            //<Line type="monotone" dataKey="mark" stroke="#8884d8" />
            // <Line 
            //   key={index}
            //   type="linear
            //   dataKey="mark" 
            //   xAxisId={mark.index}

            // />
          })}
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="weight" stroke="#ff7300" yAxisId={0} />
          {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
        </LineChart>
      </ResponsiveContainer>
      }
    </div>
  );
}

export default App;


