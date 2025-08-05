
class AddReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, commentId, userId, threadId } = payload;

    this.content = content;
    this.commentId = commentId;
    this.userId = userId;
    this.threadId = threadId;
  }

  _verifyPayload({ content, commentId, userId, threadId }) {
    if (!content || !commentId || !userId || !threadId) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if(typeof content !== 'string' || typeof commentId !== 'string' || typeof userId !== 'string' || typeof threadId !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddReply;
