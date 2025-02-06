
import './App.css'
import { router } from './Router';
import { RouterProvider } from 'react-router';

function App() {


  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
