const AddCommentLike = require('../../Domains/likes/entities/AddCommentLike');

class LikeUnlikeCommentUseCase {
  constructor({ commentLikeRepository }) {
    this._commentLikeRepository = commentLikeRepository;
  }

  async execute(payload) {
    const addCommentLike = new AddCommentLike(payload);

    const isLiked = await this._commentLikeRepository.checkIsCommentLiked(
      addCommentLike.userId,
      addCommentLike.commentId,
    );

    if (isLiked) {
      return await this._commentLikeRepository.unlikeComment(addCommentLike.userId, addCommentLike.commentId);
    }

    return await this._commentLikeRepository.likeComment(addCommentLike);
  }
}

module.exports = LikeUnlikeCommentUseCase;
