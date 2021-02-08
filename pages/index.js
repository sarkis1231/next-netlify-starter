import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router';

import en from '../locales/en/en.json';
import de from '../locales/de/de.json';

function Home() {

    const handleOnClick = async () => {
        console.log('working...')
    }
    const router = useRouter();
    const { locale } = router;
    const t = locale === 'en' ? en : de;

    const changeLanguage = (e) => {
        const locale = e.target.value;
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <>
            <Head>
                <title>Next.js Starter!</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <H1>Hello</H1>
                <H1>{t.title}</H1>
                <button onClick={handleOnClick}>Language</button>
                <select
                    onChange={changeLanguage}
                    defaultValue={locale}
                    className="text-white text-shadow-sm text-lg bg-transparent tracking-wide"
                >
                    <option className="text-black" value="en">EN</option>
                    <option className="text-black" value="de">DE</option>
                </select>
            </main>
        </>
    )
}

export default Home

const H1 = styled.h1`
  color: black;
  font-size: 60px;
`
