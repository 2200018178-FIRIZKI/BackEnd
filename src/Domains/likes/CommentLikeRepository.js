class CommentLikeRepository {
  async likeComment(payload) {
    throw new Error('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async unlikeComment(userId, commentId) {
    throw new Error('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkIsCommentLiked(userId, commentId) {
    throw new Error('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommentLikesByCommentId(commentId) {
    throw new Error('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommentLikesForEachComment(comments) {
    throw new Error('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CommentLikeRepository;
