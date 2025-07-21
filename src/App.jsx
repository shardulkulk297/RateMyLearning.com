import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import { Toaster } from "react-hot-toast"
import Layout from "./components/Reviewer/Layout"
import Dashboard from "./components/Reviewer/Dashboard"
import Signup from "./components/Signup"
import Profile from "./components/Reviewer/Profile"
import MyReviews from "./components/Reviewer/MyReviews"

function App() {


  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="reviewer" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-reviews" element={<MyReviews />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
