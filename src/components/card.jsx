import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Card (props) {
  let imageStyle = {}
  if (props.data.image_url) {
    imageStyle = {
      backgroundImage: 'url(' + props.data.image_url + ')'
    }
  }
  return (
    <div className='zs-card-container'>
      <div className='zs-card'>
        <div className='zs-card-info'>
          <div className='zs-card-image' style={imageStyle} />
          <div className='zs-card-description'>
            <Link className='zs-card-title' to={props.data.href}>
            {props.data.title}
            </Link>
            <div className='zs-card-content'>
              {props.data.description}
            </div>
            <div className='zs-card-timestamp'>
              {new Date(props.data.timestamp).toDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
    image_url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    buttons: PropTypes.array
  })
}

export default Card
