import '@styles/globals.css'
import { appWithTranslation } from '../i81n'
import App from 'next/app'

function Application({ Component, pageProps }) {
  return <Component {...pageProps} />
}

Application.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}
export default appWithTranslation(Application)

