import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Article from './pages/Article.jsx'

function NotFound () {
  return (
    <div className='text-center'>
      <h2>404...</h2>
      Page not found
    </div>
  )
}

function App (props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/article' component={Article} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
