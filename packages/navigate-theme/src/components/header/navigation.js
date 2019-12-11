import React from "react"

import { useScrollHandler } from "../../hooks/useScrollHandler"

import NavItems from "./navItems"

const Navigation = () => {
  // calling our custom hook
  const scroll = useScrollHandler()

  return (
    <>
      <div className="navigation">
        {/* updating nav className based on user scroll */}
        <nav className="navigation__nav">
          <ul className="navigation__list">
            <NavItems />
          </ul>
        </nav>
      </div>
      <div
        className={scroll ? "wrapper" : `wrapper--${process.env.GATSBY_THEME}`}
      />
    </>
  )
}

export default Navigation
