import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
// import Login from '../pages/Login'
// import App from '../src/App'
// import Signup from '../pages/Signup'
import { lazy } from 'react'
import ProtectRoute from '../components/auth/ProtectRoute'
import UserDashboard from '../pages/UserDashboard'
import Groups from '../pages/Groups'
import ChatPage from '@/components/shared/ChatPage'

let user = true
const Login = lazy(() => import('../pages/Login'))
const Signup = lazy(() => import('../pages/Signup'))
const App = lazy(() => import('../App'))
const NotFound = lazy(() => import('../pages/NotFound'))

const AppRoutes = () => {
    return <>
        <Routes>

            <Route element={<ProtectRoute user={user} />}>
                <Route path='/' element={<App />} />
                <Route path='/groups' element={<Groups />} />
                <Route path='/chat' element={<ChatPage />} />

            </Route>
            <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Login /></ProtectRoute>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </>
}

export default AppRoutes