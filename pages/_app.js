import App, {Container} from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks"
import ErrorPage from 'next/error'
import withApollo from '../utils/withApollo'
import 'isomorphic-fetch';
import redirectTo from '../utils/redirectTo'
import { hasSignedIn, hasSignedInToken } from '../utils/requireSignedin'
import { withRouter } from 'next/router'
import { RouterContext } from '../utils/useRouter'


const isServer = typeof window === 'undefined'

// Temporary wrapper to use React 16.3 Context
const InjectRouterContext = withRouter(({ router, children }) => {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
});

class MyApp extends App {
  // This function runs before opening any page and runs both - the client and server side
  static async getInitialProps({ Component, router, ctx }) {

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (pageProps.statusCode && ctx.res) {
      ctx.res.statusCode = pageProps.statusCode
    }

    return { pageProps }
  }

  // This function runs only on client side
  componentDidMount() {
    // Use console.log(this.props) to get the idea what props are available
    const { apollo, router } = this.props
    const whitelist = [
      '/',
      '/login',
      '/register',
    ]
    // An async function need to use await
    async function checkAccess() {
      const isAuth = await hasSignedIn({apolloClient: apollo})
      if (!isAuth) {
        if (! whitelist.includes(router.pathname))
          console.log('redirect happens')
          // As it's run on client side, router.push() is a way to do redirect
          router.push(`/login`)
      }
    }
    checkAccess()

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
              <InjectRouterContext>
                <Component {...pageProps} />
              </InjectRouterContext>
            </ApolloProviderHooks>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)