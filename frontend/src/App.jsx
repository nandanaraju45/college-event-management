import React from 'react'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import LearnMorePage from './pages/LearnMorePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddInstitutionPage from './pages/AddInstitutionPage'
import InstitutionListPage from './pages/InstitutionListPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/learn-more' element={<LearnMorePage />} />

          <Route path='/admin-home' element={
            <ProtectedRoute allowedTypes={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
          />

          <Route path='/add-institution' element={
            <ProtectedRoute allowedTypes={["admin"]}>
              <AddInstitutionPage />
            </ProtectedRoute>
          } />

          <Route path='/institutions' element={
            <ProtectedRoute allowedTypes={["admin"]}>
              <InstitutionListPage />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
