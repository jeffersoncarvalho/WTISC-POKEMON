import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Pokedex from './components/pokedex/Pokedex'

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className='container'>

          <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <Link to={'/'} className='navbar-brand'>Pokemon WTISC</Link>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav mr-auto'>
                <li><Link to={'/'} className='nav-link'>Home</Link></li>
                <li><Link to={'/pokedex'} className='nav-link'>Pokédex</Link></li>
                <li><span className='nav-link'>Pokéball</span></li>
                <li><span className='nav-link'>PokéArena</span></li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/pokedex' component={Pokedex}/>
          </Switch>

        </div>
      </BrowserRouter>
    )
  }

}