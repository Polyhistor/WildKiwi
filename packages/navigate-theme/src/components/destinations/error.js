import React from "react"

const Error = ({ touched, message }) => {
  if (!touched) {
    return <div>&bnsp</div>
  }
  if (message) {
    return <div>{message} </div>
  }
  return <div></div>
}

export default Error
