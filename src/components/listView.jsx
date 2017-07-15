import React, { Component } from 'react'
import Form from './form.jsx'
import PaginationDefault from './pagination.jsx'
import { debounce } from '../modules/lib.js'

const DefaultWrapper = function (props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

const DefaultlistItem = function (props) {
  return (
    <div>
      {JSON.stringify(props.model.getData())}
    </div>
  )
}

const defaultView = {
  icon: 'PLAIN',
  wrapper: DefaultWrapper,
  listItem: DefaultlistItem,
  config: {}
}

class ListView extends Component {
  constructor (props, params) {
    super(props)
    let {config} = props
    this.state = {
      params: params || {},
      ids: [],
      view: config.view || defaultView,
      loading: false
    }
    this.count = 0
    this.collection = config.collection
    this.primaryKey = config.primaryKey || 'id'

    // Sub-components that are bound to this component's state that could
    // be composed by the components that extend this
    let _this = this
    this.components = {
      list: function () {
        let Wrapper = _this.state.view.wrapper
        let ListItem = _this.state.view.listItem
        let listItems = _this.collection.items.map((model) => (
          <ListItem model={model} key={model.getData()[_this.primaryKey]} />
        ))
        return (
          <Wrapper>
            {listItems}
          </Wrapper>
        )
      }
    }
  }

  componentWillMount () {
    this.getModels()
  }

  getModels (params = {}) {
    let _this = this
    let newParams = Object.assign({}, _this.state.params, params)
    _this.setState({loading: true})
    return this.collection.get(newParams).then(function (data) {
      let {models, count} = data
      _this.count = count
      let ids = models.map(function (model) {
        return model.getData()['id']
      })
      _this.setState({ids: ids, params: newParams, loading: false})
    })
  // TODO : this catch block is catching card.jsx error as well. Need to be fix.
  // .catch(function (err) {
  //   console.error(err.message)
  // })
  }

  componentWillReceiveProps (newProps) {
    if (this.state.view !== newProps.config.view) {
      this.setState({view: newProps.config.view})
    }
  }

  render () {
    return this.components.list()
  }
}

class PaginatedListView extends ListView {
  constructor (props) {
    let perpage = props.config.perPage || 10
    super(props, {page: 1, per_page: perpage})
    this.perPage = perpage

    // Sub components
    let _this = this
    this.components.pagination = function () {
      return (
        <PaginationDefault data={{count: _this.count, currentPage: (_this.state.params.page || 1)}} config={{perPage: _this.perPage}} events={{onChange: _this.getPage.bind(_this)}} />
      )
    }
  }
  getPage (page) {
    let _this = this
    this.getModels({page: page, per_page: _this.perPage})
  }
  render () {
    return (
      <div>
        {this.components.list()}
        {this.components.pagination()}
      </div>
    )
  }
}

class FilterableListView extends PaginatedListView {
  constructor (props) {
    super(props)
    let _this = this
    this.filterApplied = false
    this.filterFormProps = {
      config: {
        fields: props.config.filters || {}
      },
      events: {
        onSubmit: _this.filter.bind(_this),
        change: debounce(_this.filter.bind(_this), 500)
      }
    }
    this.components.filters = function () {
      return (
        <Form {..._this.filterFormProps} />
      )
    }
  }
  filter (params) {
    params.page = 1
    this.filterApplied = true
    this.getModels(params)
  }
  render () {
    return (
      <div>
        {this.components.filters()}
        {this.components.list()}
        {this.components.pagination()}
      </div>
    )
  }
}

export { ListView, FilterableListView, PaginatedListView }
