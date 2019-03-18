import App, {Container} from 'next/app'
import { ApolloProvider } from 'react-apollo'
import ErrorPage from 'next/error'
import withApollo from '../utils/withApollo'
import 'isomorphic-fetch';
import redirectTo from '../utils/redirectTo'
import { hasSignedIn } from '../utils/requireSignedin'


class MyApp extends App {

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

    if (!(await hasSignedIn(ctx))) {
      if (! whitelist.includes(ctx.pathname))
      redirectTo('/login', { res: ctx.res, status: 301 })
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
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)