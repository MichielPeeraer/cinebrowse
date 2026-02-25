import "@mantine/core/styles.css";
import React from "react";
import {
    MantineProvider,
    ColorSchemeScript,
    mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../../theme";
import { MainLayout } from "@/components/MainLayout";

export const metadata = {
    title: "CineBrowse",
    description: "I am using Next.js with Mantine UI!",
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.png" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <MainLayout>{children}</MainLayout>
                </MantineProvider>
            </body>
        </html>
    );
}
