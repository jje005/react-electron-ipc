import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const electron = window.require("electron")

const stop_sin = () => {
  electron.ipcRenderer.send('stop_sin', 'stop');
}
export default class LineChartComponent extends PureComponent {

  render() {
    
    const sinData = this.props.sinData;

    intervalId = setInterval(() => {
      const xValue = sinData.name;
      const yValue = sinData.uv;
      
    })
    return (
      <LineChart 
        width={500}
        height={400}
        data={sinData}          
        margin={{
            top: 25,
            right: 40,
            left: 20,
            bottom: 10,
        }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>,
        <button size="large" onClick={stop_sin}>stop</button>
        );
  }
}