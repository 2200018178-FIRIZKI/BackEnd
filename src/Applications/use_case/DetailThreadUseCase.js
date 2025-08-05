const DetailComment = require("../../Domains/comments/entities/DetailComment");
const DetailReply = require("../../Domains/replies/entities/DetailReply");

class DetailThreadUseCase {
  constructor({ threadRepository, commentRepository, replyRepository, commentLikeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
    this._commentLikeRepository = commentLikeRepository;
  }

  async execute(id) {
    const thread = await this._threadRepository.getThreadById(id);
    let comments = await this._commentRepository.getAllCommentsByThreadId(id);
    const replies = await this._replyRepository.getAllRepliesByThreadId(id);

    comments = await this._commentLikeRepository.getCommentLikesForEachComment(comments);

    comments = comments.map((comment) => {
      return {
        ...new DetailComment(comment),
        replies: replies.filter((reply) => reply.comment_id === comment.id)
          .map((reply) => ({...new DetailReply(reply)})),
      };
    });

    return {...thread, comments};
  }
}

module.exports = DetailThreadUseCase;
