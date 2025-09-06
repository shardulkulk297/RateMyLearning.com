import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import { Toaster } from "react-hot-toast"
import Layout from "./components/Reviewer/Layout"
import Dashboard from "./components/Reviewer/Dashboard"
import Signup from "./components/Signup"
import Profile from "./components/Reviewer/Profile"
import MyReviews from "./components/Reviewer/MyReviews"
import RateCourse from "./components/Reviewer/RateCourse"
import SearchResults from "./components/Reviewer/SearchResults"
import ViewReviews from "./components/Reviewer/ViewReviews"

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
            <Route path="your-reviews" element={<MyReviews />} />
            <Route path="rate-course" element={<RateCourse/>}/>
            <Route path="search-results" element={<SearchResults/>} />
            <Route path="view-reviews" element = {<ViewReviews/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
