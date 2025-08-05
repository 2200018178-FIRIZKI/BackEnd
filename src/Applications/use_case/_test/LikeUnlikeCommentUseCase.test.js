const CommentLikeRepository = require('../../../Domains/likes/CommentLikeRepository');
const AddCommentLike = require('../../../Domains/likes/entities/AddCommentLike');

const LikeUnlikeCommentUseCase = require('../LikeUnlikeCommentUseCase');

describe('LikeUnlikeCommentUseCase', () => {
  it('should orchestrating the like action correctly', async () => {
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    const mockCommentLikeRepository = new CommentLikeRepository();

    mockCommentLikeRepository.checkIsCommentLiked = jest
      .fn(() => Promise.resolve(false));
    mockCommentLikeRepository.likeComment = jest
      .fn(() => Promise.resolve());

    const likeUnlikeCommentUseCase = new LikeUnlikeCommentUseCase({
      commentLikeRepository: mockCommentLikeRepository,
    });

    await likeUnlikeCommentUseCase.execute(payload);

    expect(mockCommentLikeRepository.checkIsCommentLiked)
      .toBeCalledWith(payload.userId, payload.commentId);
    expect(mockCommentLikeRepository.likeComment)
      .toBeCalledWith(new AddCommentLike(payload));
  });

  it('should orchestrating the unlike action correctly', async () => {
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    const mockCommentLikeRepository = new CommentLikeRepository();

    mockCommentLikeRepository.checkIsCommentLiked = jest
      .fn(() => Promise.resolve(true));
    mockCommentLikeRepository.unlikeComment = jest
      .fn(() => Promise.resolve());

      const likeUnlikeCommentUseCase = new LikeUnlikeCommentUseCase({
        commentLikeRepository: mockCommentLikeRepository,
      });
  
      await likeUnlikeCommentUseCase.execute(payload);
  
      expect(mockCommentLikeRepository.checkIsCommentLiked)
        .toBeCalledWith(payload.userId, payload.commentId);
      expect(mockCommentLikeRepository.unlikeComment)
        .toBeCalledWith(payload.userId, payload.commentId);
  });
});