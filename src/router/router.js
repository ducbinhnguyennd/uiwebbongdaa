import { Register } from '../Layout/RegisterLayout'
import { Logintong } from '../Layout/LoginLayout'

const publicRoutes = [
  { path: '/', component: Logintong, layout: null },
  { path: '/register', component: Register, layout: null }
]
const privateRoutes = []
export { publicRoutes, privateRoutes }
                                            