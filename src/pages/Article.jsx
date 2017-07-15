import React, { Component } from 'react'
import API from './../modules/api.js'
import { API_HOST } from 'config'
import { getURLParams } from './../modules/lib.js'
import ArticleTemplate from './../components/articleTemplate.jsx'
import Comment from './../components/comment.jsx'
import Layout from './../components/Layout.jsx'

class Article extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
    this.id = getURLParams()['id']
    this.api = new API({url: API_HOST + '/details' + `/${this.id}`})
  }

  componentWillMount () {
    let _this = this
    this.api.get().then(function (response) {
      _this.setState({data: response})
    })
  }

  render () {
    let {data} = this.state
    let commentsView = null
    if (!!data.comments) {
      commentsView = data.comments.map(function (item, index) {
        let comment = <Comment data={item} />
        let replies = null
        if (!!item.replies) {
          replies = item.replies.map(function (reply, index) {
            return (
              <Comment key={index} data={reply} />
            )
          })
        }
        return (
          <div key={index} className='comment-wrapper'>
            {comment}
            {replies}
          </div>
        )
      })
    }
    return (
      <Layout>
        <div className='aritle-wrapper'>
          <ArticleTemplate data={data} />
          {commentsView}
        </div>
      </Layout>
    )
  }
}

export default Article
