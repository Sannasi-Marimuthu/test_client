import AddPost from "./components/AddPost"
import UpdatePost from "./components/UpdatePost"
import LoadingSpinner from "./components/LoadingSpinner"
import NotFound from "./components/NotFound"
import PostList from "./components/PostList"

import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
  {path:"/", element:<PostList />},
  {path:"/create", element:<AddPost />},
  {path:"/update/:postid", element:<UpdatePost />},
  {path:"*", element:<NotFound />},
])
function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App