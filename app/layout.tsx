import '@mantine/core/styles.layer.css';
import type {Metadata} from "next";

import {ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';
import ListContextProvider from "@/app/ListsContext";

export const metadata: Metadata = {
    title: 'Shopping',
    description: 'A little shopping list app',
};


const theme = createTheme({
    colors: {
        theme: [
            "#ebefff",
            "#d5dafc",
            "#a9b1f1",
            "#7b87e9",
            "#5362e1",
            "#3a4bdd",
            "#2d3fdc",
            "#1f32c4",
            "#182cb0",
            "#0b259c"
        ]
    },

    components: {
        Button: {
            defaultProps: {
                color: "theme"
            },
        },
        Title: {
            defaultProps: {
                c: "black"
            },
        },
        Text: {
            defaultProps: {
                c: "black"
            },
        },
        Grid: {
            defaultProps: {
                bg: "theme.1"
            }
        }
    },

    primaryColor: "theme",
    primaryShade: 6,
    defaultRadius: "md"
});

export interface Tab {
    slug: string,
    text: string
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title title="Foo"/>
            <ColorSchemeScript defaultColorScheme="auto"/>

            <meta name="application-name" content="Shopping"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
            <meta name="apple-mobile-web-app-title" content="PWA App"/>
            <meta name="description" content="A little shopping list app"/>
            <meta name="format-detection" content="telephone=no"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="theme-color" content="#a9b1f1"/>

            <link rel="manifest" href="/manifest.json"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
            <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5"/>
            <link rel="shortcut icon" href="/icons/favicon.ico"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="msapplication-config" content="/icons/browserconfig.xml"/>
            <meta name="theme-color" content="#ffffff"/>

        </head>
        <body>
        <MantineProvider theme={theme}>
            <ListContextProvider>
                {children}
            </ListContextProvider>
        </MantineProvider>
        </body>
        </html>
    );
}
