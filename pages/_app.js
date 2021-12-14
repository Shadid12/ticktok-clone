import { createContext, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import '../styles/globals.css'
import Layout from '../components/Layout'


export const UserContext = createContext(null)

function MyApp({ Component, pageProps }) {
  const [authState, setAuthState] = useState(null)

  const updateAuthState = data => setAuthState(data)
  
  return (
    <UserContext.Provider value={{ authState, updateAuthState }}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserContext.Provider>
  ) 
}

export default MyApp
