import React from 'react'

const ArticleTemplate = (props) => {
  let image = props.data.image_url ? <img className="article-main-image" src={props.data.image_url} /> : ''
  return (
    <div>
      <h1>{props.data.title}</h1>
      {image}
      <p>{props.data.description}</p>
      <textarea placeholder="Write a response..." rows="5" className="comment-textarea"></textarea>
    </div>
  )
}

export default ArticleTemplate