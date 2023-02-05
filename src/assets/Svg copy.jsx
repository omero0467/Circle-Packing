import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import data from  '../../hashedCsv.json'
import { svg } from 'd3'
const Svg = () => {
  // const [arr, setArr] = useState([])
  const [zoomLevel, setCount] = useState(0)

  const width = 960
  const height = width    
let arr =[]
  console.warn('group'+zoomLevel)
  function handleClick(){
    setCount((zoomLevel) => zoomLevel + 1)
  }
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

      // (function(){
      //   const svg = d3.select('svg')
      //   svg.selectAll("*").transition('t').remove()
      //   const nodes = svg.append('g').selectAll('circle').data(arr).join(enter=>enter
      //   .append('circle')
      //   .attr('r',15),
      //   update=>update
      //   .append('circle')
      //   ,exit=>{console.log('Exit Selection', exit)
      // return exit.attr('fill','blue')})
      //   // .attr('x',25)
      //   // .attr('y',25)
      //   .attr('transform',(d,i)=>`translate(${(i%19)*50},${Math.floor(i/20)*50})`)
      //   .attr('cx',-width/2 + 25)
      // // console.log(svg.selectAll('circle').exit());
      // })()
    
      // return () => {
      //   d3.select('svg').empty()
      // }
    }, [arr])
    

// console.log(arr);
// d3.append('g').selectAll('circle').data(data).enter().append('circle').attr('r',(d)=>d*2)
// .attr('cx',(d,i)=>i*50)
// .attr('transform',`translate(${width/2},${height/2})`)
// .attr('fill','#C70039')
// .attr('opacity',0.2)

  // console.log(data); .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
  return (<>
  <svg width={width} viewBox={`-${width / 2} -${width /2} ${width} ${width}`} style={{backgroundColor:" #ffffffbd"}} height={width}>
    {arr.map((element,i)=>{
      return <circle r={15} cx={-width/2 +25} transform={`translate(${(i%19)*50},${Math.floor(i/20)*50})`}></circle>
    })}
  </svg>
  <button onClick={() => handleClick()}>
             Level is {zoomLevel}
           </button>
  </>
  
  )
}

export default Svg