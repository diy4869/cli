import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import router from './router'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello React!</p>
        <h1>{count}</h1>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            点击
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
      <main>
        <Switch>
          {
            router.map(item => {
              return (
                <Route
                  exact
                  path={item.path}
                  component={item.component}
                  key={item.path}
                />
              )
            })
          }
        </Switch>
        <Router></Router>
      </main>
    </div>
  )
}

export default App
