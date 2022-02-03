// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary' // This import substitutes directly the following class component:
// Create an error boundary component for the components inside to detect rendering errors (in this case <PokemonInfo>) as well as JS errors
// class ErrorBoundary extends React.Component {
//   state = {error: null}
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   render() {
//     const {error} = this.state

//     if (error) {
//       return <this.props.FallbackComponent error={error} />
//       // return (
//       //   <div role="alert">
//       //     There was an error:{' '}
//       //     <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       //   </div>
//       // )
//     }

//     return this.props.children
//   }
// }

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle', // This ternary avoids to render the 'idle' state prior to a valid pokemonName entered
    pokemon: null,
    error: null,
  })

  // These states are substituted to be able to render with a single status object
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)

  // const [status, setStatus] = React.useState('idle');

  React.useEffect(() => {
    // To begin the page loading and avoid the error to activate:
    if (!pokemonName) {
      return
    }

    setState({status: 'pending'})

    fetchPokemon(pokemonName).then(
      pokemonData => {
        setState({pokemon: pokemonData, status: 'resolved'})
      },
      error => {
        setState({error: error, status: 'rejected'})
      },
    )
    // This is substituted by the status enums
    // return () => {
    //   setError(null);
    //   setPokemon(null)
    // }
  }, [pokemonName])

  switch (state.status) {
    case 'idle':
      return 'Submit a pokemon'

    case 'pending':
      // "... loading" state
      return <PokemonInfoFallback name={pokemonName} />

    case 'rejected':
      throw state.error
    // The following is now managed by ErrorBoundary
    // return (
    //   <div role="alert">
    //     There was an error:{' '}
    //     <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
    //   </div>
    // )
    case 'resolved':
      return <PokemonDataView pokemon={state.pokemon} />
    default:
      throw new Error('What the heck?!')
  }
}

const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  const handleReset = () => {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* Instead of "key" prop, to re-mount only when an error is received with the feature 'resetErrorBoundary' */}
        {/* from ErrorBoundary, passed to the ErrorFallback function */}
        <ErrorBoundary
          // key={pokemonName} // We use the "key" prop to reset (unmount, re-mount) when the specified key gets updated
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          // with the following, we can set a name without applying it with the "Try again" button
          resetKeys={[pokemonName]} // While the error is present, when the indicated values get changed, the ErrorBoundary resets itself
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
// 🐨 Have state for the pokemon (null)
// 🐨 use React.useEffect where the callback should be called whenever the
// pokemon name changes.
// 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
// 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
// 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
// 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
//   fetchPokemon('Pikachu').then(
//     pokemonData => {/* update all the state here */},
//   )
// 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
//   1. no pokemonName: 'Submit a pokemon'
//   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
//   3. pokemon: <PokemonDataView pokemon={pokemon} />
