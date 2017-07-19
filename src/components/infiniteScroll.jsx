import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InfiniteScroll extends Component {
  constructor (props) {
    super(props)
    this.page = this.props.startPage || 0
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    var clientHeight = document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

    if (scrolledToBottom) {
      this.props.loadMore(this.page += 1)
    }
  }

  render () {
    const defaultLoader = (<div>
                             Loading&hellip;
                           </div>)
    let childrenList = [this.props.children]
    if (this.props.hasMore) {
      if (this.props.loader) {
        childrenList.push(this.props.loader)
      }else {
        childrenList.push(defaultLoader)
      }
    }
    return (
      <div>
        {childrenList}
      </div>
    )
  }
}

InfiniteScroll.propTypes = {
  startPage: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  loader: PropTypes.object
}

export default InfiniteScroll
