import "@emotion/react";

export const defaultScheme = {
    colors: {
        primaryBg: "#F3E7E7",
        secondaryBg: "#D6ADAD",
        accentBg: "#B06660",
        containerBg: "#FBF7F6",
        text: {
            primary: "#313131",
            secondary: "#FBF7F6",
            accent: "#FBF7F6"
        }
    }
}

type DefaultScheme = typeof defaultScheme;

declare module "@emotion/react" {
    export interface Theme extends DefaultScheme {}
}
