import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FormPage, Home } from './pages'
import { Toaster } from "@/components/ui/toaster"
import { ProjectProvider } from './context/project'

export const App = () => {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/forms' element={<FormPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ProjectProvider>
  )
}
