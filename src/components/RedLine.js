import Recat from 'react';
import {
    ReferenceLine,
} from 'rechart';

function drawRedLine(){
    newRedfereceLines = 
    [...newReferenceLines, <ReferenceLine key={uniqueKey} x={dataCount} stroke="red" label= {dataCount+"ms"} />];
}

export default  drawRedLine();