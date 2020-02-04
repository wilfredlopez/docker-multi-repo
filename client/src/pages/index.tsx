import * as React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import "./index.scss"
export interface IIndexProps {}

interface IndexState {
  seenIndexes: any[]
  values: any
}

export function Index(props: IIndexProps) {
  const [state, setState] = React.useState<IndexState>({
    values: {},
    seenIndexes: [],
  })

  const [index, setIndex] = React.useState<string>("")

  React.useEffect(() => {
    async function fetchValues() {
      const values = await axios.get("/api/values/current")

      setState(current => {
        return {
          ...current,
          values: values.data,
        }
      })
    }

    async function fechIndexes() {
      const seenIndexes = await axios.get("/api/values/all")

      setState(current => {
        return {
          ...current,
          seenIndexes: seenIndexes.data,
        }
      })
    }

    fetchValues()
    fechIndexes()
  }, [])

  function renderSeenIndexes() {
    return state.seenIndexes
      .map(n => {
        return n.number
      })
      .join(", ")
  }

  function renderValues() {
    const entries = []

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key}, I Calculated {state.values[key]}
        </div>,
      )
    }
    return entries
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post("/api/values", {
      index: index,
    })

    setIndex("")
  }
  return (
    <div className="wl-container center">
      <form onSubmit={handleSubmit}>
        <label>Enter Index</label>
        <input
          type="text"
          value={index}
          onChange={e => {
            setIndex(e.target.value)
          }}
        ></input>
        <button>Submit</button>
      </form>
      <h3>Indexes i have seen:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}

      <p>
        <Link to="/sample">Navigate to Sample Page</Link>
      </p>
    </div>
  )
}
