import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import router from './router'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  )
}

export default App
