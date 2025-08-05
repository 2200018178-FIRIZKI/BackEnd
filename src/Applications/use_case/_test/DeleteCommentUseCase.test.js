const CommentRepository = require('../../../Domains/comments/CommentRepository');

const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      id: 'comment-123',
      threadId: 'thread-123',
      userId: 'user-123',
    };

    // Mocking
    const mockCommentRepository = new CommentRepository();

    // Action
    mockCommentRepository.checkCommentAvailabilityInThread = jest.fn()
    .mockImplementation(() => Promise.resolve());
    mockCommentRepository.checkCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
    });
    
    // Assert
    await expect(deleteCommentUseCase.execute(useCasePayload))
      .resolves.not.toThrowError();
    expect(mockCommentRepository.checkCommentAvailabilityInThread)
      .toBeCalledWith(useCasePayload.id, useCasePayload.threadId);
    expect(mockCommentRepository.checkCommentOwner)
      .toBeCalledWith(useCasePayload.id, useCasePayload.userId);
    expect(mockCommentRepository.deleteCommentById)
      .toBeCalledWith(useCasePayload.id);
  });
});