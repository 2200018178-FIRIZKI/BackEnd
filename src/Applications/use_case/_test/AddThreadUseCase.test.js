const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'sebuah thread',
      body: 'sebuah body thread',
      owner: 'user-123',
    };

    // Mocking
    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: 'user-123',
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await getThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: 'user-123',
    }));
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: useCasePayload.owner,
    }));
  });
});
