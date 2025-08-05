const AddReply = require('../AddReply');


describe('an AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'sebuah reply',
    };

    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      content: 123,
      commentId: true,
      userId: {},
      threadId: [],
    };

    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = {
      content: 'sebuah reply',
      commentId: 'comment-123',
      userId: 'user-123',
      threadId: 'thread-123',
    };

    const addReply = new AddReply(payload);

    expect(addReply.content).toEqual(payload.content);
    expect(addReply.commentId).toEqual(payload.commentId);
    expect(addReply.userId).toEqual(payload.userId);
    expect(addReply.threadId).toEqual(payload.threadId);
  });
});