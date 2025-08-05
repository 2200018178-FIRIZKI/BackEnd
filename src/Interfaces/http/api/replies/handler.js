const autoBind = require('auto-bind');
const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');

class RepliesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postReplyHandler(request, h) {
    const payload = {
      ...request.payload,
      threadId: request.params.threadId,
      commentId: request.params.commentId,
      userId: request.auth.credentials.id,
    };

    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    const addedReply = await addReplyUseCase.execute(payload);

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });

    response.code(201);
    return response;
  }

  async deleteReplyHandler(request, h) {
    const { replyId: id, commentId, threadId } = request.params;
    const userId = request.auth.credentials.id;
    const payload = {
      id,
      commentId,
      threadId,
      userId,
    };

    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name);
    await deleteReplyUseCase.execute(payload);

    return {
      status: 'success',
    };
  }
}

module.exports = RepliesHandler;
