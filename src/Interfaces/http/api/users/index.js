const routes = require('./routes');
const UsersHandler = require('./handler');

module.exports = {
  name: 'users',
  register: async (server, { container }) => {
    const usersHandler = new UsersHandler(container);
    server.route(routes(usersHandler));
  },
};
