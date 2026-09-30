import { BrowserRouter } from 'react-router'
import { AppRoutes } from './app/router.tsx'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
