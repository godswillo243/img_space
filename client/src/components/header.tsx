import React from 'react'
import {Link} from "react-router-dom"
const Header = () => {
  return (
    <div className="p-4">
      <Link to="/">
        <h3 className="h3-bold montserrat-700">IMG_SPACE</h3>
      </Link>
    </div>
  )
} 

export default Header