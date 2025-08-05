const DeleteReply = require('../../Domains/replies/entities/DeleteReply');

class DeleteReplyUseCase {
  constructor({ replyRepository }) {
    this._replyRepository = replyRepository;
  }

  async execute(payload) {
    const deleteReply = new DeleteReply(payload);
    await this._replyRepository.checkReplyAvailabilityInComment(deleteReply.id, deleteReply.commentId, deleteReply.threadId);
    await this._replyRepository.checkReplyOwner(deleteReply.id, deleteReply.userId);
    await this._replyRepository.deleteReplyById(deleteReply.id);
  }
}

module.exports = DeleteReplyUseCase;
