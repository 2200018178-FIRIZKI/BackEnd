const autoBind = require('auto-bind');
const LikeUnlikeCommentUseCase = require('../../../../Applications/use_case/LikeUnlikeCommentUseCase');

class CommentLikesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async putCommentLikeHandler(request, h) {
    const { threadId, commentId } = request.params;
    const payload = {
      userId: request.auth.credentials.id,
      threadId,
      commentId,
    };

    const likeUnlikeCommentUseCase = this._container.getInstance(LikeUnlikeCommentUseCase.name);
    await likeUnlikeCommentUseCase.execute(payload);

    return {
      status: 'success',
    };
  }
}

module.exports = CommentLikesHandler;
