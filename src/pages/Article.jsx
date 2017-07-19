import React, { Component } from 'react'
import API from './../modules/api.js'
import { API_HOST } from 'config'
import { getURLParams } from './../modules/lib.js'
import ArticleTemplate from './../components/articleTemplate.jsx'
import Comment from './../components/comment.jsx'
import Layout from './../components/Layout.jsx'
import InfiniteScroll from './../components/infiniteScroll.jsx'

class Article extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      data: {},
      comments: []
    }
    this.id = getURLParams()['id']
    this.api = new API({url: API_HOST + '/details' + `/${this.id}`})
    this.commentApi = new API({url: API_HOST + '/comments' + `/${this.id}`})
    this.getCommentsData = this.getCommentsData.bind(this)
  }

  componentWillMount () {
    let _this = this
    this.api.get().then(function (response) {
      _this.setState({data: response})
    })
  }

  getCommentsData() {
    let _this = this
    this.setState({
      loading: true
    })
    this.commentApi.get().then(function (response) {
      _this.setState(function (prevState) {
        let newState = Object.assign({}, prevState)
        newState['comments'] = newState['comments'].concat(response.comments)
        newState['loading'] = false
        return newState
      })
    })
  }

  render () {
    let {data, comments} = this.state
    let commentsView = null
    if (!!comments) {
      commentsView = comments.map(function (item, index) {
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
          <InfiniteScroll loadMore={this.getCommentsData} hasMore={this.state.loading}>
            {commentsView}
          </InfiniteScroll>
        </div>
      </Layout>
    )
  }
}

export default Article
