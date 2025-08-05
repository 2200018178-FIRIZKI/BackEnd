const ReplyRepository = require('../../../Domains/replies/ReplyRepository');

const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the delete reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'reply-123',
      commentId: 'comment-123',
      threadId: 'thread-123',
      userId: 'user-123',
    };

    // Mocking
    const mockReplyRepository = new ReplyRepository();

    // Action
    mockReplyRepository.checkReplyAvailabilityInComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.checkReplyOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockReplyRepository.deleteReplyById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    // Assert
    await expect(deleteReplyUseCase.execute(useCasePayload))
      .resolves.not.toThrowError();
    expect(mockReplyRepository.checkReplyAvailabilityInComment)
      .toBeCalledWith(useCasePayload.id, useCasePayload.commentId, useCasePayload.threadId);
    expect(mockReplyRepository.checkReplyOwner)
      .toBeCalledWith(useCasePayload.id, useCasePayload.userId);
    expect(mockReplyRepository.deleteReplyById)
      .toBeCalledWith(useCasePayload.id);
  });
});