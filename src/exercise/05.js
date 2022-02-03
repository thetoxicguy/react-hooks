// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js
// 🐨 create a ref here with React.useRef()
// 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
// div look fancy.
 
// 💰 like this:
// const tiltNode = tiltRef.current
// VanillaTilt.init(tiltNode, {
//   max: 25,
//   speed: 400,
//   glare: true,
//   'max-glare': 0.5,
// })

// 🐨 add the `ref` prop to the `tilt-root` div here:

// 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
// object to your DOM node to cleanup:
// `return () => tiltNode.vanillaTilt.destroy()`

// 💰 Don't forget to specify your effect's dependencies array! In our case
// we know that the tilt node will never change, so make it `[]`. Ask me about
// this for a more in depth explanation.

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const tiltRef = React.useRef();
  
  React.useEffect(() => {
    // Assign the rendered node on which VanillaTilt will be applied to tiltNode
    const tiltNode = tiltRef.current

    // Apply VanillaTilt to the rendered DOM node "tiltNode"
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })
    // Cleanup function as return value in useEffect (because Vanillatilt is still in memory assigned to an element tiltNode)
    // vanillaTilt is a property set by Vanillatilt to the node
    return () => tiltNode.vanillaTilt.destroy()
  },
  [] // Called only when mounted, the cleanup function applies when the node is unmounted
  )

  return (
    // The parent div will receive the useEffect instructions. It has the linear gradient color
    <div ref = {tiltRef} className="tilt-root">
      {/* The div inside has white background color */}
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      {/* This (child) div occupies the whole white div being tilted */}
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
