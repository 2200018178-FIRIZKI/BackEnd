const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class DeleteCommentUseCase {
  constructor( {commentRepository} ) {
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    const deleteComment = new DeleteComment(payload);
    await this._commentRepository.checkCommentAvailabilityInThread(deleteComment.id, deleteComment.threadId);
    await this._commentRepository.checkCommentOwner(deleteComment.id, deleteComment.userId);
    await this._commentRepository.deleteCommentById(deleteComment.id);
  }
}

module.exports = DeleteCommentUseCase;
