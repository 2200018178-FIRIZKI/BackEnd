class DeleteReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, commentId, threadId, userId } = payload;

    this.id = id;
    this.commentId = commentId;
    this.threadId = threadId;
    this.userId = userId;
  }

  _verifyPayload({ id, commentId, threadId, userId}) {
    if (!id || !commentId || !threadId || !userId) {
      throw new Error('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof commentId !== 'string' || typeof threadId !== 'string' || typeof userId !== 'string') {
      throw new Error('DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteReply;
