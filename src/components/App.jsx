import { useState } from 'react'
import React from 'react'
import Signin from './Signin'
import Signup from './Signup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="wrapper">
      <Signin/>
      {/* <Signup/> */}
    </div>
  )
}

export default App
