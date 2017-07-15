import React from 'react'

function Grid (props) {
  return (
    <div className='zs-grid'>
      {props.children}
    </div>
  )
}

function GridCell (props) {
  return (
    <div className='zs-grid-cell'>
      {props.children}
    </div>
  )
}

function GridCellFixedRatio (props) {
  return (
    <div className='zs-grid-cell-golden-ratio'>
      <div className='zs-grid-cell-golden-ratio-content'>
        {props.children}
      </div>
    </div>
  )
}

export {Grid, GridCell, GridCellFixedRatio}
