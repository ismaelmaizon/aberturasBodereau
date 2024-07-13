
//import clases from './App.modules.css'
import { Route, Routes } from 'react-router-dom'
//context
import CartProvider from './components/context/context.jsx'
//component
import SignInSide from './components/login/SignInSide.jsx'
import Inicio from './components/inicio/inicio.jsx'
import NavBar from './components/navbar/navBar.jsx'
import AddProducto from './components/addproduct/addproducto.jsx'
import clases from './App.module.css'
import AddProductLug from './components/addproductLug/addproductLug.jsx'


function App() {

  return (
    <>
      <div className={clases.class} >
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
              <Route element={<Inicio/>} path='/' ></Route>
              <Route element={<AddProducto/>} path='/addproducto' ></Route>
              <Route element={<AddProductLug/>} path='/addproductLug' ></Route>
            </Routes>
          </div>
        </CartProvider>
      </div>
    </>
  )
}

export default App
