import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import { router } from "./routes"
import { ThemeProvider } from "@emotion/react"
import { defaultScheme } from "./assets/theme"

export const App = () => {
  return (
    <ThemeProvider theme={defaultScheme}>
      <RouterProvider router={router}/>
      <Toaster />
    </ThemeProvider>
  )
}
