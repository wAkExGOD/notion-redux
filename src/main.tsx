import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { routes } from "./lib/routes"
import {
  Error,
  Home,
  LogIn,
  Registration,
  Notes,
  CreateNote,
  EditNote,
  Note,
} from "./pages"
import { RootLayout } from "./components/layouts"
import { ProtectedRoute } from "./components/common"
import { store } from "./redux/store"
import "./index.css"

const authRoutes = [
  {
    path: routes.logIn,
    element: <LogIn />,
    errorElement: <Error />,
  },
  {
    path: routes.registration,
    element: <Registration />,
    errorElement: <Error />,
  },
]

const noteRoutes = [
  {
    path: routes.notes.root,
    element: (
      <ProtectedRoute>
        <Notes />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: routes.notes.template,
    element: (
      <ProtectedRoute>
        <Note />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: routes.notes.create,
    element: (
      <ProtectedRoute>
        <CreateNote />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: routes.notes.edit.template,
    element: (
      <ProtectedRoute>
        <EditNote />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
]

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <RootLayout />,
    children: [
      {
        path: routes.home,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      ...authRoutes,
      ...noteRoutes,
      {
        path: "*",
        element: <Error text="404 Not Found" />,
      },
      {
        path: routes.notFound,
        element: <Error text="404 Not Found" />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
