import React, { ReactNode } from "react"
import { Header } from "./header/Header"
import { Stack } from "./Stack"
import { useTheme } from "@emotion/react"

export interface PageProps {
    children: ReactNode
}

export const Page: React.FC<PageProps> = x => {
    const theme = useTheme()
    return (
        <Stack direction="column" style={{ height: "100vh" }}>
            <Header />
            <div style={{ background: theme.colors.primaryBg, height: "100%" }}>
                {x.children}
            </div>
        </Stack>
    )
}