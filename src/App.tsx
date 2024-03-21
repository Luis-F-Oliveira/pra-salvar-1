import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardPage, EditPage, FormPage, Home } from './pages'
import { Toaster } from "@/components/ui/toaster"
import { ProjectProvider } from './context/project'

export const App = () => {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/forms' element={<FormPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/dashboard/edit' element={<EditPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ProjectProvider>
  )
}
