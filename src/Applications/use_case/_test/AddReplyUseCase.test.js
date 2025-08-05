const AddReply = require('../../../Domains/replies/entities/AddReply');
const AddedReply = require('../../../Domains/replies/entities/AddedReply');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');

const AddReplyUseCase = require('../AddReplyUseCase');

describe('AddReplyUseCase', () => {
  it('should orchestrating the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'sebuah reply',
      commentId: 'comment-123',
      userId: 'user-123',
      threadId: 'thread-123',
    };

    // Mocking
    const mockAddedReply = new AddedReply({
      id: 'reply-123',
      content: 'sebuah reply',
      owner: 'user-123',
    });

    const mockReplyRepository = new ReplyRepository();

    mockReplyRepository.addReply = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedReply));

    const getReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    // Action
    const addedReply = await getReplyUseCase.execute(useCasePayload);

    // Assert
    expect(addedReply).toStrictEqual(new AddedReply({
      id: 'reply-123',
      content: useCasePayload.content,
      owner: 'user-123',
    }));
    expect(mockReplyRepository.addReply).toBeCalledWith(new AddReply({
      content: useCasePayload.content,
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
      threadId: useCasePayload.threadId,
    }));
  });
});