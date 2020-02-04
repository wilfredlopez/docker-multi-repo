import * as React from "react"
import { Link } from "react-router-dom"

export interface ISamplePageProps {}

export function SamplePage(props: ISamplePageProps) {
  return (
    <div className="wl-container center">
      <h1>SamplePage COMPONENT</h1>
      <Link to="/">Back to Main Page</Link>
    </div>
  )
}
