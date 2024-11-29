import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './feature/app/store.js'
import { RouterProvider } from 'react-router-dom'
import routes from './router/routes.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>,
)
