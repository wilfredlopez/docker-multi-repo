import React from "react"
import AppRouter from "./router"
import "./app.scss"

const App = () => {
  return (
    <>
      <header>
        <h1>FIB CONVERTER</h1>
      </header>
      <main>
        <AppRouter />
      </main>
    </>
  )
}

export default App
