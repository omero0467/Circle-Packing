import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import json from './assets/flare-2.json'
const Svg = () => {
  const [zoomLevel, setCount] = useState(0)
  const data = json

  const width = 960
  const height = width    
  // function handleClick(){
  //   setCount((zoomLevel) => zoomLevel + 1)
  // }
  const pack = data => d3.pack()
  .size([width, height])
  .padding(40)
(d3.hierarchy(data)
  .sum(d => d.value)
  .sort((a, b) => b.value - a.value))

  const root = pack(data);
  let focus = root;
  let view;


  const color = d3.scaleLinear()
  .domain([0, 5])
  .range(["hsl(274, 100%, 50%)", "#441a66"])
  .interpolate(d3.interpolateHcl)

  
  const styles ={
    margin: `${0 -14}px`,
    backgroundColor: '#ac67fb',
    cursor: "pointer"
  }
  
  
  useEffect(()=>
{
  
  const svg = d3.select('svg').on("click", (event) => zoom(event, root));
  console.log(root.descendants());


  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    // .join("circle")
    .enter()
    .append('circle')
      .attr("fill", d => d.children ? color(d.depth) : "#c18bff")
      // .attr("fill", d => d.parent ? color(d.depth): "white")
      // .attr("fill", d => d.parent === root ? color(d.depth) : "white")
      .attr("display", d => d.parent===root ? "inline" : "none")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

  const label = svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);

      
      function zoomTo(v) {
        const k = width / v[2];
        
        view = v;
        
        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k).attr();
      }
      
  zoomTo([root.x, root.y, root.r * 2]);
  
  function zoom(event, d) {
    const focus0 = focus;

    focus = d;
    setCount(focus.depth)
    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    node
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  return ()=>{
    svg.selectAll('*').remove()
  }
  
},[])

useEffect(()=>{
  console.log(root)
  console.log('Focus',focus)
},[focus])

  
 // console.log(data); .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
  return (<>
  <svg width={width} style={styles} viewBox={`-${width / 2} -${width /2} ${width} ${width}`}  height={width}>

  </svg>
  <button onClick={() => handleClick()}>
             Level is {zoomLevel}
           </button>
  </>
  
  )
}

export default Svg