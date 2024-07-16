import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Items from './components/pages/Items'
import Contacts from './components/pages/Contacts'
import Registration from './components/pages/Registration'
import ShoppingCart from './components/pages/ShoppingCart'
import NotFound from './components/pages/NotFound'
import MainLayout from './components/layouts/MainLayout'

function App() {
  
  return (
    <BrowserRouter>
      <div>      
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="items" element={<Items />} />
            <Route path="shoppingCart" element={<ShoppingCart />} />
            <Route path="registration" element={<Registration />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
