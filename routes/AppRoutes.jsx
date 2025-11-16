import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import App from '../src/App'
import Signup from '../pages/Signup'

const AppRoutes = () => {
    return <>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
    </>
}

export default AppRoutes