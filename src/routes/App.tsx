import LoginPage from '../pages/LoginPage'
import './../App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;
