import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ProtectedRoute, Landing, Register} from './pages'
import {SharedLayout, Stats, AllTransactions, AddTransaction, Profile} from './pages/dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-transactions" element={<AllTransactions />} />
          <Route path="add-transaction" element={<AddTransaction />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
