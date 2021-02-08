import '@styles/globals.css'
import {ThemeProvider} from "styled-components";
import {THEME} from "../constants/theme";
import GlobalStyle from "@styles/GlobalStyle";
import TronWebProvider from "@components/TronWebProvider/TronWebProvider";

function Application({Component, pageProps}) {
    return (
        <>
        <ThemeProvider theme={THEME}>
            <GlobalStyle/>
            <TronWebProvider>
                <Component {...pageProps} />
            </TronWebProvider>
        </ThemeProvider>
        </>
    )
}

export default Application

