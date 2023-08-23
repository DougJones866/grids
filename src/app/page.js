'use client'

import { useState, useEffect } from 'react';

import Image from 'next/image'
import styles from './page.module.css'





const GridComponent = ({ onRemove }) => {
  const colSize = 5;
  const rows = 5;
  const [columnSize, setColumnSize] = useState(colSize);
  const [rowSize, setRowSize] = useState(rows);
  
  const [hoveredCell, setHoveredCell] = useState(null);

  const gridStyle = {
    gridTemplateColumns: `repeat(${columnSize}, 1fr)`,
    gridTemplateRows: `repeat(${rowSize}, 1fr)`
  };

  const handleMouseEnter = (index) => {
    setHoveredCell(index);
    console.log(index)
  };
  
  const getIndex = (index) => {
    console.log('Index:', index);
  }

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const gridElements = [];

  // Loop to generate a 4x4 grid
  for (let row = 0; row < rowSize; row++) {
    for (let col = 0; col < columnSize; col++) {
      // Calculate a unique key for each grid element
      const key = row * columnSize + col;
      const cells = {
        backgroundColor: hoveredCell === key ? "orangered" : ""
      };

      // Create a <div> element for each cell in the grid
      const divElement = (
        <div
          key={key}
          className={styles.gridCell}
          onMouseEnter={() => handleMouseEnter(key)}
          onMouseLeave={handleMouseLeave}
          onClick={getIndex}
          style={cells}
        ></div>
      );

      // Push the <div> element into the array
      gridElements.push(divElement);
    }
  }

  return (
    <>
    <div className={styles.gridContainer} style={gridStyle}>
      {gridElements}
    </div>
    {/* <button onClick={onRemove}>Remove Grid</button> */}
    </>
  );
};

export default function App() {
  const [showGrid, setShowGrid] = useState(true);
  
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const removeGrid = () => {
    setShowGrid(false);
  };

  const newGrid = () => {
    setShowGrid(true);
    
  };


  return (
    <>
      <button className={styles.btn} onClick={newGrid}>New Grid</button>
      <button className={styles.btn} onClick={toggleGrid}>Toggle Grid</button>
      {showGrid && <GridComponent  onRemove={removeGrid} />}
    </>
  );
}
