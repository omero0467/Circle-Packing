import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import data from  '../../hashedCsv.json'
import { svg } from 'd3'
const Svg = () => {
  // const [arr, setArr] = useState([])
  const [zoomLevel, setCount] = useState(0)

  const width = 1024
  const height = width    
let arr =[]
  console.warn('group'+zoomLevel)
    for (const title in data) {
      if (Object.hasOwnProperty.call(data, title)) {
        const element = data[title];
        if(element[zoomLevel] === zoomLevel+1){
          console.log(title);
          arr.push(title)
        } else if (element[zoomLevel] < zoomLevel+1){
          console.log(`%c${title}`,'background-color: rgba(255, 222, 4, 0.741);')
         arr = arr.filter((el)=>el!==title)
        }
      }
    }
    console.log(`%c${arr}`,'background-color: #b6f0807a;')
    console.error('End')
    
    useEffect(() => {
      (function(){
        const svg = d3.select('svg')
        const nodes = svg.append('g').selectAll('circle').data(arr).enter().append('circle').attr('r',20).attr('cx',25).attr('cy',25)
        .attr('transform',(d,i)=>`translate(${(i%20)*50},${Math.floor(i/20)*50})`)
      console.log(svg.selectAll('circle').exit());

      })()
    
      return () => {
        d3.select('svg').empty()
      }
    }, [svg])
    

// console.log(arr);
// d3.append('g').selectAll('circle').data(data).enter().append('circle').attr('r',(d)=>d*2)
// .attr('cx',(d,i)=>i*50)
// .attr('transform',`translate(${width/2},${height/2})`)
// .attr('fill','#C70039')
// .attr('opacity',0.2)

  // console.log(data);
  return (<>
  <svg width={width} style={{backgroundColor:" #ffffffbd"}} height={width}>
    
  </svg>
  <button onClick={() => setCount((zoomLevel) => zoomLevel + 1)}>
             Level is {zoomLevel}
           </button>
  </>
  
  )
}

export default Svg