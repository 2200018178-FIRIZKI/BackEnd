const DeleteReply = require('../DeleteReply');

describe('a DeleteReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new DeleteReply(payload)).toThrowError('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      commentId: true,
      threadId: {},
      userId: [],
    };

    // Action and Assert
    expect(() => new DeleteReply(payload)).toThrowError('DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create deleteReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      threadId: 'thread-123',
      commentId: 'comment-123',
      userId: 'user-123',
    };

    // Action
    const deleteReply = new DeleteReply(payload);

    // Assert
    expect(deleteReply.id).toEqual(payload.id);
    expect(deleteReply.threadId).toEqual(payload.threadId);
    expect(deleteReply.commentId).toEqual(payload.commentId);
  });
});