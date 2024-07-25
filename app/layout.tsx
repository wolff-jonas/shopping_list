import '@mantine/core/styles.layer.css';
import type {Metadata} from "next";

import {AppShell, AppShellFooter, AppShellMain, ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';
import NavFooter from "@/app/NavFooter";

export const metadata: Metadata = {
    title: 'Shopping',
    description: 'A little shopping list app',
};


const theme = createTheme({
    colors: {
        purple: [
            "#ffeaff",
            "#ffd0fb",
            "#fe9df6",
            "#fc68f1",
            "#fb3dec",
            "#fb25ea",
            "#fc19ea",
            "#e10dd0",
            "#c801ba",
            "#af00a2"
        ]
    },

    components: {
        Button: {
            defaultProps: {
                color: "purple"
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
                bg: "purple.1"
            }
        }
    },

    primaryColor: "purple",
    primaryShade: 6,
    defaultRadius: "md"
});

export type Tab = {
    slug: string,
    text: string
}

const TABS: Tab[] = [
    {slug: "/lists", text: "Lists"},
    {slug: "/presets", text: "Presets"}
]

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
            <meta name="theme-color" content="#ffd0fb"/>

            <link rel="icon" type="image/png" href="/icons/favicon.png"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="shortcut icon" href="/favicon.ico"/>

        </head>
        <body>
        <MantineProvider theme={theme}>
            <AppShell>
                <AppShellMain>
                    {children}
                </AppShellMain>
                <AppShellFooter>
                    <NavFooter tabs={TABS}/>
                </AppShellFooter>
            </AppShell>
        </MantineProvider>
        </body>
        </html>
    );
}
