// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  // const name = ''
  const [name, setName] = React.useState(initialName);

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" placeholder="John Doe" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

// // To manage state from multiple inputs I used the tutorial
// // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

// function Greeting({initialPerson}) {
//   // const name = ''
//   const [person, setPerson] = React.useState({firstName: initialPerson.firstName, lastName: initialPerson.lastName});

//   function handleChange(event) {
//     const value = event.target.value;
//     setPerson({
//       ...person,
//    // Square brackets indicate "dynamic key"
//       [event.target.name]: value
//     });
//   }

//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input onChange={handleChange} name="firstName" value={person.firstName} placeholder="John"/>
//         <label htmlFor="name">Last name: </label>
//         <input onChange={handleChange} name="lastName" value={person.lastName} placeholder="Doe"/>
//       </form>
//       {person ? <strong>Hello {person.firstName} {person.lastName}</strong> : 'Please type your name'}
//     </div>
//   )
// }

function App() {
  return <Greeting initialName='Your name here' />
  // return <Greeting initialPerson='Your name here' />
}

export default App
