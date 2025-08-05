const AddReply = require('../../Domains/replies/entities/AddReply');

class AddReplyUseCase {
  constructor({ replyRepository }) {
    this._replyRepository = replyRepository;
  }

  async execute(payload) {
    const newReply = new AddReply(payload);
    return this._replyRepository.addReply(newReply);
  }
}

module.exports = AddReplyUseCase;
