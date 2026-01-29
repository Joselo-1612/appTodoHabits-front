import ProtectedRoute from '../components/ProtectedRoute'
import { useSession } from '../hooks/useSession'
import HabitPage from '../pages/HabitPage'
import LoginPage from '../pages/LoginPage'
import './../App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {

  const sessionToken = localStorage.getItem("token") ?? "";

  console.log("valor de sessionToken", [sessionToken]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute isAllowed={!!sessionToken} />}>
          <Route path="/habits" element={<HabitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
