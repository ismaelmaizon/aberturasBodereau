
//import clases from './App.modules.css'
import { Route, Routes } from 'react-router-dom'
//context
import CartProvider from './components/context/context.jsx'
//component
import SignInSide from './components/login/SignInSide.jsx'
import Inicio from './components/inicio/inicio.jsx'
import NavBar from './components/navbar/navBar.jsx'

function App() {

  return (
    <>
      <div>
        <CartProvider>
          <div>
            <Routes>
              <Route element={<SignInSide/>} path='/login' ></Route>
            </Routes>
          </div>
          <div>
            <div>
              <NavBar/>
            </div>
            <Routes>
              <Route element={<Inicio/>} path='/Inicio' ></Route>
            </Routes>
          </div>
        </CartProvider>
      </div>
    </>
  )
}

export default App
