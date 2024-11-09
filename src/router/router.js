import { Register } from '../Layout/RegisterLayout'
import { Logintong } from '../Layout/LoginLayout'
import { HomeAdmin } from '../Layout/HomeAdmin'

import { Login } from '../Layout/LoginLayout/Login'

const publicRoutes = [
  { path: '/', component: Logintong, layout: null },
  { path: '/admin', component: HomeAdmin, layout: null },
  { path: '/register', component: Register, layout: null },
  { path: '/login', component: Login, layout: null }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
