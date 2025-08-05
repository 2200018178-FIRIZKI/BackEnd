
class DeleteComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, threadId, userId } = payload;

    this.id = id;
    this.threadId = threadId;
    this.userId = userId;
  }

  _verifyPayload({ id, threadId, userId }) {
    if (!id || !threadId || !userId) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof threadId !== 'string' || typeof userId !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteComment;
