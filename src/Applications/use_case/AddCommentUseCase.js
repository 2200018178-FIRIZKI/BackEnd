const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({ commentRepository }) {
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    const newComment = new AddComment(payload);
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
