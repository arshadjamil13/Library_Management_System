
import AppLayout from './components/layout/AppLayout'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/Dashboard/DashboardPage'
import BooksPage from './pages/Books/BooksPage'
import AuthorsPage from './pages/Authors/AuthorsPage'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'


function App() {
 

  return (
    <>
    <Routes>

      <Route path='/signin' element= {<SignIn />} />
      <Route path='/signup' element={<SignUp />} />

      <Route path="/" element={<AppLayout />} >
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="authors" element={<AuthorsPage />} />
        </Route>
    </Routes>
    {/* <DashboardPage /> */}
    </>
  )
}

export default App
