// import { ThemeProvider } from "@emotion/react"
// import { defaultScheme } from "./assets/theme"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import { router } from "./routes"

export const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
      <Toaster />
    </>
  )
}
