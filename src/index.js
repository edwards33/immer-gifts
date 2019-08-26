import React, { useState, memo, useCallback } from "react"
import ReactDOM from "react-dom"
import uuidv4 from "uuid/v4"
import produce from "immer"

import { getInitialState, addGift } from "./gifts"

import "./misc/index.css"

const Gift = memo(({ gift, users, currentUser, onReserve }) => (
  <div className={`gift ${gift.reservedBy ? "reserved" : ""}`}>
    <img src={gift.image} alt="gift" />
    <div className="description">
      <h2>{gift.description}</h2>
    </div>
    <div className="reservation">
      {!gift.reservedBy || gift.reservedBy === currentUser.id ? (
        <button onClick={() => onReserve(gift.id)}>{gift.reservedBy ? "Unreserve" : "Reserve"}</button>
      ) : (
        <span>{users[gift.reservedBy].name}</span>
      )}
    </div>
  </div>
))

function GiftList() {
  const [state, setState] = useState(() => getInitialState())
  const { users, gifts, currentUser } = state

  const handleAdd = () => {
    const description = prompt("Gift to add")
    if (description)
      setState(state => addGift(state, uuidv4(), description, "https://picsum.photos/200?q=" + Math.random()))
  }

  const handleReserve = useCallback(id => {
    setState(
      produce(draft => {
        const gift = draft.gifts.find(gift => gift.id === id)
        gift.reservedBy =
          gift.reservedBy === undefined
            ? draft.currentUser.id
            : gift.reservedBy === draft.currentUser.id
            ? undefined
            : gift.reservedBy
      })
    )
  }, [])

  return (
    <div className="app">
      <div className="header">
        <h1>Hi, {currentUser.name}</h1>
      </div>
      <div className="actions">
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="gifts">
        {gifts.map(gift => (
          <Gift key={gift.id} gift={gift} users={users} currentUser={currentUser} onReserve={handleReserve} />
        ))}
      </div>
    </div>
  )
}

ReactDOM.render(<GiftList />, document.getElementById("root"))
