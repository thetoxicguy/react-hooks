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

// ------------------------------------------------------ Normal version
// function useLocalStorageState(key, defaultValue='') {
//   // By including the initial value in a function, we tell useState to load only when an initial value is absent
//   // We set the function to access the localStorage variable of our choice by adding "key" and use "state" to refer an initial value
//   const [state, setState] = React.useState(() => {return window.localStorage.getItem(key) ?? defaultValue})

//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   },
//   [key, state]
//   )
//   return [state, setState]
// }

// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorageState(initialName)
//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// ------------------------------------------------------ Serializing to transfer data in localStorage & "key" value change
function useLocalStorageState(key, defaultValue = '') {
  // By including the initial value in a function, we tell useState to load only when an initial value is absent
  // We set the function to access the localStorage variable of our choice by adding "key" and use "state" to refer an initial value
  const serialize = JSON.stringify
  const deserialize = JSON.parse

  // The function here sets a "Lazy State Initialization" (initial state loaded only if it is needed)
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    // Consider the case in which "defaultValue" is a function to call
    return typeof(defaultValue) === 'function' ? defaultValue() : defaultValue
  })

  // We make a reference to "key" in case its value is subject to change (like in an iteration)
  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    // If "key" value has changed, remove the item from memory
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current=key

    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])
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
