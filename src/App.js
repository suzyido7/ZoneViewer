import React, { useEffect, useState } from "react"
import ContainedButtons from "./components/ContainedButtons"

import './App.css';

const ZONE_COLOR = "green"
const SELECTED_ZONE_COLOR = "blue"
const BASE_URL = "http://localhost:5000/"
const SVG_HEIGHT = "600"
const SVG_WIDTH = "1600"
const POINT_RADIUS = 3

function App() {
  const [zones, setZones] = useState([])
  const [selectedShape, setSelectedShape] = useState(-1)
  const [toRefresh, setToRefresh] = useState(false)
  const [mousePos, setMousePos] = useState({});
  const [newZone, setNewZone] = useState([]);

  const handleMouseClick = (event) => {
    if(event.clientY > SVG_HEIGHT) {
      return
    }
    const updatedNewZone = newZone
    let isNewPoint = true
    for(let point of updatedNewZone) {
      if(point[0] === event.clientX && point[1] === event.clientY) {
        isNewPoint = false
      }
    }
    if(isNewPoint) {
      updatedNewZone.push([event.clientX, event.clientY])
      if(updatedNewZone.length === 4) {
        createZone(updatedNewZone)
      }
      else {
        setNewZone(updatedNewZone)
      }
    }
  };
  
  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    fetchZonesData()
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [])

  useEffect(() => {
    setToRefresh(false)
    setSelectedShape(-1)
    const updatedNewZone = newZone
    setNewZone(updatedNewZone.splice(0))
    fetchZonesData()
  }, [toRefresh])

  
  useEffect(() => {
    setSelectedShape(-1)
    const updatedNewZone = newZone
    updatedNewZone.splice(0)
    setNewZone(updatedNewZone.splice(0))
  }, [zones])

  const drawZonesInArea = () => {
    if(zones.length === 0) {
      return(
        <polygon points=""/>
      )      
    }
    
    return zones.map((zone, index) => {
      const point = zone.points
      const color = index === selectedShape ? SELECTED_ZONE_COLOR : ZONE_COLOR
      return(
        <polygon points={`${point.flat(1)}`} style={{fill: color}}/>
      )})

  }

  const drawNewPointsInArea = () => {
    return newZone.map((point) => {
      return(
        <circle cx={point[0]} cy={point[1]} r={POINT_RADIUS} fill={SELECTED_ZONE_COLOR} />
      )})

  }

  const drawZones = () => {
    return <div>
              <svg height={SVG_HEIGHT} width={SVG_WIDTH}>
                {drawNewPointsInArea()}
                {drawZonesInArea()}
              </svg>
          </div>
  }

  const fetchZonesData = async () => {
    fetch(`${BASE_URL}zones`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setZones(data)
      })
  }

  const deleteZone = () => {
    if(selectedShape < 0) {
      setToRefresh(true)
      return
    }
    fetch(`${BASE_URL}zone/${zones[selectedShape].id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(setToRefresh(true))
    .catch(error => console.error(error));
  }
  
  const createZone = (newZone) => {
    fetch(`${BASE_URL}zone`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"name": "zone 100", "points": newZone})
    })
    .then(res => res.json())
    .then(setToRefresh(true))
    .catch(error => console.error(error));
  }
  
  return (
    <ContainedButtons zones={zones} 
                      drawZones={drawZones}
                      selectedShape={selectedShape}
                      setSelectedShape={setSelectedShape}
                      deleteZone={deleteZone}/>
  );
}

export default App;
