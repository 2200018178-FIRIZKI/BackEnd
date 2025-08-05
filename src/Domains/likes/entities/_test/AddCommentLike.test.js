const AddCommentLike = require('../AddCommentLike');

describe('an AddCommentLike entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      commentId: 'comment-123',
    };

    // Action and Assert
    expect(() => new AddCommentLike(payload)).toThrowError('ADD_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      threadId: [],
      commentId: 123,
    };

    // Action and Assert
    expect(() => new AddCommentLike(payload)).toThrowError('ADD_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addCommentLike object correctly', () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    // Action and Assert
    const { userId, threadId, commentId } = new AddCommentLike(payload);

    expect(userId).toEqual(payload.userId);
    expect(threadId).toEqual(payload.threadId);
    expect(commentId).toEqual(payload.commentId);
  });
});