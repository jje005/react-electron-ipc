// import { useState } from 'react';
// import { FixedSizeList } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';

// function GraphList({ data }) {
//   const [hoverIndex, setHoverIndex] = useState(-1);

//   function handleMouseEnter(index) {
//     setHoverIndex(index);
//   }

//   function handleMouseLeave() {
//     setHoverIndex(-1);
//   }

//   function Row({ index, style }) {
//     const item = data[index];

//     return (
//       <div
//         style={{
//           ...style,
//           display: 'flex',
//           alignItems: 'center',
//           padding: '8px',
//           background: hoverIndex === index ? 'lightgray' : 'white',
//         }}
//         onMouseEnter={() => handleMouseEnter(index)}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div style={{ marginRight: '16px' }}>{item.name}</div>
//         <div style={{ flex: 1 }}>
//           <LineChart width={420} height={200} data={item.chartData}>
//             <XAxis dataKey="xvalue" domain={['auto', 'auto']} />
//             <YAxis domain={[-127, 128]} ticks={[-127, -64, 0, 64, 128]} />
//             <CartesianGrid stroke="#ccc" />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{r:8}}/>
//           </LineChart>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AutoSizer>
//       {({ width, height }) => (
//         <FixedSizeList
//           height={height}
//           width={width}
//           itemSize={280}
//           itemCount={data.length}
//         >
//           {Row}
//         </FixedSizeList>
//       )}
//     </AutoSizer>
//   );
// }