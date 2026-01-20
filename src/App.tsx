import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './store'
import 'react-loading-skeleton/dist/skeleton.css'
import './i18n'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
