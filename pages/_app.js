import App, {Container} from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"
import ErrorPage from 'next/error'
import withApollo from '../utils/withApollo'
import 'isomorphic-fetch';
import redirectTo from '../utils/redirectTo'
import { hasSignedIn, hasSignedInToken } from '../utils/requireSignedin'


class MyApp extends App {
  // This function runs before opening any page
  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {}
    let whitelist = [
      '/',
      '/login',
      '/register',
    ]

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (pageProps.statusCode && ctx.res) {
      ctx.res.statusCode = pageProps.statusCode
    }

    // Check authentication if using a session cookie
    if (!(await hasSignedIn(ctx))) {
      if (! whitelist.includes(ctx.pathname))
      redirectTo('/login', { res: ctx.res, status: 301 })
    }

    // Check authentication if using a JWT
    if (!(await hasSignedInToken(ctx))) {
      console.log('Not authenticated by token')
    } else {
      console.log('Authenticated by token')
    }

    return { pageProps }
  }

  render () {
    const {Component, pageProps, apollo, statusCode } = this.props
    if (statusCode) {
      return <ErrorPage statusCode={statusCode} />
    }
    return(
      <Container>
        <ApolloProvider client={apollo}>
          <ApolloProviderHooks client={apollo}>
            <Component {...pageProps} />
          </ApolloProviderHooks>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)