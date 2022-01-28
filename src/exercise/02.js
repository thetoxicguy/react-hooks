// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Custom hooks is just a fancy name to create code to reuse and be called just like callbacks in JS
// (always with the word "use" before)
// We also create generic parameters (key, defaultValue) to use later in the callback
// 🐨 initialize the state to the value from localStorage
// 💰 window.localStorage.getItem('name') ?? defaultValue

// 🐨 Here's where you'll use `React.useEffect`.
// The callback should set the `name` in localStorage.
// 💰 window.localStorage.setItem('name', name)

function useLocalStorageState(key, defaultValue='') {
  // By including the initial value in a function, we tell useState to load only when an initial value is absent
  // We set the function to access the localStorage variable of our choice by adding "key" and use "state" to refer an initial value
  const [state, setState] = React.useState(() => {return window.localStorage.getItem(key) ?? defaultValue})

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  },
  [key, state]
  )
  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
