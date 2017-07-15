import React, { Component } from 'react'
import Like from './Like.jsx'

class Comment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let {props} = this
    let imageStyle = {}
    if (props.data.image_url) {
      imageStyle = {
        backgroundImage: 'url(' + props.data.image_url + ')'
      }
    }
    return (
      <div className='comment-container'>
        <div>
          <div className='commented-user-image' style={imageStyle} />
          <div className='commented-user-name'>
            <div>
              {props.data.name}
            </div>
            <div>
              {new Date(props.data.timestamp).toDateString()}
            </div>
          </div>
        </div>
        <div className='comment-text'>
          {props.data.text}
        </div>
        <Like likes={props.data.likes} />
      </div>
    )
  }
}

export default Comment
