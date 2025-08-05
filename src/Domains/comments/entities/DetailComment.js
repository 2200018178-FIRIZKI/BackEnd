class DetailComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const {id, username, date, content, is_deleted: isDeleted, likeCount } = payload;

    this.id = id;
    this.username = username;
    this.date = date;
    this.content = isDeleted ? "**komentar telah dihapus**" : content;
    this.likeCount = likeCount;
  }

  _verifyPayload({ id, username, date, content, is_deleted }) {
    if (!id || !username || !date || !content || (is_deleted === undefined)) {
      throw new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof date !== 'string' || typeof content !== 'string' || typeof is_deleted !== 'boolean') {
      throw new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailComment;
