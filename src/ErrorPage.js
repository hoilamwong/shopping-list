import React from 'react'
import { useRouteError } from 'react-router-dom'

const Missing = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <main className="error-page h-screen">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-3xl '>
        <i>{error.statusText || error.message}</i>
      </p>
    </main>
  )
}

export default Missing
