import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Index } from "./pages"
import { SamplePage } from "./pages/samplePage"

interface Props {}

const AppRouter: React.FC<Props> = () => {
  return (
    <BrowserRouter basename="/">
      <Route path="/" exact component={Index} />
      <Route path="/sample" exact component={SamplePage} />
    </BrowserRouter>
  )
}

export default AppRouter
