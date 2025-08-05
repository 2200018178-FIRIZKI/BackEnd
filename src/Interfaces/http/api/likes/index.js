const routes = require('./routes');
const CommentLikesHandler = require('./handler');

module.exports = {
  name: 'likes',
  register: async (server, { container }) => {
    const commentLikesHandler = new CommentLikesHandler(container);
    server.route(routes(commentLikesHandler));
  },
};
