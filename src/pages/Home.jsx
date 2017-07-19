import React, { Component } from 'react'
import Card from './../components/card.jsx'
import API from './../modules/api.js'
import { API_HOST } from 'config'
import { Grid, GridCell } from './../components/grid.jsx'
import Layout from './../components/Layout.jsx'
import InfiniteScroll from './../components/infiniteScroll.jsx'

class Home extends Component {
  constructor (props) {
    super(props)
    this.api = new API({url: API_HOST + '/articles'})
    this.state = {
      loading: false,
      data: []
    }
    this.getData = this.getData.bind(this)
  }

  componentWillMount () {
    this.getData()
  }

  getData () {
    let _this = this
    this.setState({
      loading: true
    })
    this.api.get().then(function (response) {
      _this.setState(function (prevState) {
        let newState = Object.assign({}, prevState)
        newState['data'] = newState['data'].concat(response)
        newState['loading'] = false
        return newState
      })
    })
  }

  render () {
    const loader = <div className='loader'>
                     Loading&hellip;
                   </div>
    let {data} = this.state
    let listItems = data.map(function (item, index) {
      item.href = `/article?id=${item.id}`
      return (
        <GridCell key={index}>
          <Card data={item} />
        </GridCell>
      )
    })
    return (
      <Layout>
        <InfiniteScroll loadMore={this.getData} loader={loader} hasMore={this.state.loading}>
          <Grid>
            {listItems}
          </Grid>
        </InfiniteScroll>
      </Layout>
    )
  }
}

export default Home
