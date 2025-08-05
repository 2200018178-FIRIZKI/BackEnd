const AddComment = require('../AddComment');

describe('an AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'sebuah comment',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 'sebuah comment',
      threadId: true,
      userId: 123,
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'sebuah comment',
      threadId: 'thread-123',
      userId: 'user-123',
    };

    // Action
    const { content, threadId, userId } = new AddComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
    expect(userId).toEqual(payload.userId);
  });
});
