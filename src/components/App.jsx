import { useState } from 'react'
import React from 'react'
import Signin from './Signin'
import Signup from './Signup'

import Profile from './Profile'
import { Navigate, Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/signin" replace />}/>
          </Routes>
      </>
  );
}

export default App
