import React, { Component } from 'react'
import Card from './../components/card.jsx'
import API from './../modules/api.js'
import { API_HOST } from 'config'
import { Grid, GridCell } from './../components/grid.jsx'
import Layout from './../components/Layout.jsx'

class Home extends Component {
  constructor (props) {
    super(props)
    this.api = new API({url: API_HOST + '/articles'})
    this.state = {
      data: []
    }
  }

  componentWillMount () {
    let _this = this
    this.api.get().then(function (response) {
      _this.setState({
        data: response
      })
    })
  }

  render () {
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
        <Grid>
          {listItems}
        </Grid>
      </Layout>
    )
  }
}

export default Home
