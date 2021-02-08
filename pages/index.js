import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import styled, {ThemeProvider} from 'styled-components'
import {withTranslation, i18n} from '../i81n'
import {THEME} from "../constants/theme";
import GlobalStyle from "../styles/GlobalStyle";
import TronWebProvider from "@components/TronWebProvider/TronWebProvider";

function Home({t}) {
    const handleOnClick = async () => {
        await i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')
    }
    return (
        <ThemeProvider theme={THEME}>
            <GlobalStyle/>
            <TronWebProvider>
                <Head>
                    <title>Next.js Starter!</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main>
                    <Header title="Welcome to my app!"/>
                    <p className="description">
                        Get started by editing <code>pages/index.js</code>
                    </p>
                    <H1>Hello</H1>
                    <H1>{t('test')}</H1>
                    <button onClick={handleOnClick}>Language</button>
                </main>

                <Footer/>
            </TronWebProvider>
        </ThemeProvider>
    )
}

Home.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
export default withTranslation('common')(Home)

const H1 = styled.h1`
  color: black;
  font-size: 60px;
`
