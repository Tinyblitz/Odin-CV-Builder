import { useState } from 'react'
import './App.css'

import GenInfo from './components/GenInfo.jsx'
import Edu from './components/Education.jsx'
import Work from './components/Work.jsx'

function App() {
  const [isEdit, setEditState] = useState(true)

  const handleSubmit = (e) => {
      e.preventDefault();
      setEditState(isEdit ? false : true);
  };

  return (
    <>
      <h1>CV Creator</h1>
      <form onSubmit={handleSubmit}>
        <GenInfo isEdit={isEdit} />
        <Edu isEdit={isEdit} />
        <Work isEdit={isEdit} />
        <button type="submit">{isEdit ? "Submit" : "Edit"}</button>
      </form>
    </>
  )
}

export default App
