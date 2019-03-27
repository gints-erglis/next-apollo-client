const routes = module.exports = require('next-routes')()

routes
  .add('user', '/user/:id', 'profile')
  .add('logout', '/logout', 'logout')