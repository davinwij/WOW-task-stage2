import React, { useState } from "react"
import { ReactReader } from "react-reader"

const Book = () => {
  // And your own state logic to persist state
  const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }
  return (
    
        <div style={{ height:"100vh"}}>
        <ReactReader
            location={location}
            locationChanged={locationChanged}
            url="https://gerhardsletten.github.io/react-reader/files/alice.epub"                
        />
        </div>
    
  )
}

export default Book