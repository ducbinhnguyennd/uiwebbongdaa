import { Register } from '../Layout/RegisterLayout'
import { Logintong } from '../Layout/LoginLayout'
import { Login } from '../Layout/LoginLayout/Login'

const publicRoutes = [
  { path: '/', component: Logintong, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/login', component: Login, layout: null }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
