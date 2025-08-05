const CommentLikeRepository = require('../CommentLikeRepository');

describe('CommentLikesRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const commentLikeRepository = new CommentLikeRepository();

    await expect(commentLikeRepository.likeComment({}))
      .rejects.toThrowError('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentLikeRepository.unlikeComment('', ''))
      .rejects.toThrowError('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentLikeRepository.checkIsCommentLiked('', ''))
      .rejects.toThrowError('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentLikeRepository.getCommentLikesByCommentId(''))
      .rejects.toThrowError('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentLikeRepository.getCommentLikesForEachComment([]))
      .rejects.toThrowError('COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});