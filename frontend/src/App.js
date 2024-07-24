import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map'
import PolygonPanel from './components/PolygonPanel';


const polygons = [
  {
    name: 'houston polygon',
    id: 'f85d46e205a5d0f10a9508eb3a7cb15b',
    geoJson: {
      id: 'f85d46e205a5d0f10a9508eb3a7cb15b',
      type: "Feature",
      properties: {},
      geometry: {
          coordinates: [
              [
                  [
                      -97.60033517369311,
                      31.06228223935561
                  ],
                  [
                      -93.11129564342431,
                      30.7602095281447
                  ],
                  [
                      -96.19200904654988,
                      27.375926990391648
                  ],
                  [
                      -97.60033517369311,
                      31.06228223935561
                  ]
              ]
          ],
          type: 'Polygon'
      }
    }
  },
  {
    name: 'houston polygon two',
    id: 'j85d46e205a5d0f10a9508eb3a7cb15b',
    geoJson: {
      id: 'f85d46e205a5d0f10a9508eb3a7cb15b',
      type: "Feature",
      properties: {},
      geometry: {
          coordinates: [
              [
                  [
                      -98.60033517369311,
                      31.06228223935561
                  ],
                  [
                      -94.11129564342431,
                      30.7602095281447
                  ],
                  [
                      -97.19200904654988,
                      27.375926990391648
                  ],
                  [
                      -98.60033517369311,
                      31.06228223935561
                  ]
              ]
          ],
          type: 'Polygon'
      }
    }
  },
];
 const handleEdit = ()=> {
  console.log('this is a edit')
 }

 function App() {
  return (
    <div className="App">
      <div className="container">
        <PolygonPanel polygons={polygons} onEdit={handleEdit} />
        <div className="map-container">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;