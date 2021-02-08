import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import styled from 'styled-components'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
          <H1>Hello</H1>
      </main>

      <Footer />
    </div>
  )
}

const H1 = styled.h1`
  color: black;
  font-size: 60px;
`
