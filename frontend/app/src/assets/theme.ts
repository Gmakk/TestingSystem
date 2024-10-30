import "@emotion/react";

export const defaultScheme = {
    colors: {
        primaryBg: "#FFFFFF",
        secondaryBg: "#CAD6DA"
    }
}

type DefaultScheme = typeof defaultScheme;

declare module "@emotion/react" {
    export interface Theme extends DefaultScheme {}
}
