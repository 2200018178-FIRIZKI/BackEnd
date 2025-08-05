const DetailThread = require('../../../Domains/threads/entities/DetailThread')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const CommentLikeRepository = require('../../../Domains/likes/CommentLikeRepository');

const DetailThreadUseCase = require('../DetailThreadUseCase');
const AddCommentLike = require('../../../Domains/likes/entities/AddCommentLike');

describe('DetailThreadUseCase', () => {
  it('should orchestrating the detail action correctly', async () => {
    // Arrange
    const id = 'thread-123';

    // Mocking
    const mockResult = {
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:22:33.555Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: '2021-08-10T07:59:57.000Z',
          content: 'sebuah comment',
          likeCount: 1,
          replies: [
            {
              id: 'reply-123',
              content: 'sebuah reply',
              date: '2021-08-11T07:59:57.000Z',
              username: 'dicoding',
            }
          ],
        },
      ],
    };

    const mockDetailThread = new DetailThread({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:22:33.555Z',
      username: 'dicoding',
    });

    const mockDetailComment = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '2021-08-10T07:59:57.000Z',
        content: 'sebuah comment',
        is_deleted: false,
      },
    ];

    const mockDetailReply = [
      {
        id: 'reply-123',
        content: 'sebuah reply',
        date: '2021-08-11T07:59:57.000Z',
        username: 'dicoding',
        is_deleted: false,
        comment_id: 'comment-123',
      },
    ];

    const addCommentLike = new AddCommentLike({
      userId: 'user-123',
      commentId: 'comment-123',
      threadId: 'thread-123',
    });

    const mockCommentLike = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '2021-08-10T07:59:57.000Z',
        content: 'sebuah comment',
        is_deleted: false,
        likeCount: 1,
      }
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();
    const mockCommentLikeRepository = new CommentLikeRepository();

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailThread));
    mockCommentRepository.getAllCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailComment));
    mockCommentLikeRepository.likeComment = jest.fn()
      .mockImplementation(() => Promise.resolve(addCommentLike));
    mockCommentLikeRepository.getCommentLikesForEachComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockCommentLike));
    mockReplyRepository.getAllRepliesByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailReply));  
    
    const getThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      commentLikeRepository: mockCommentLikeRepository,
    });

    // Action
    const detailThread = await getThreadUseCase.execute(id);

    // Assert
    expect(detailThread).toStrictEqual(mockResult);
    expect(mockThreadRepository.getThreadById)
      .toBeCalledWith(id);
    expect(mockCommentRepository.getAllCommentsByThreadId)
      .toBeCalledWith(id);
    expect(mockReplyRepository.getAllRepliesByThreadId)
      .toBeCalledWith(id);
  });

  it('should not display comments or reply if comment or reply is deleted and orchestrating the detail action correctly', async () => {
    // Arrange
    const id = 'thread-123';

    // Mocking
    const mockResult = {
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:22:33.555Z',
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: '2021-08-10T07:59:57.000Z',
          content: '**komentar telah dihapus**',
          likeCount: 1,
          replies: [
            {
              id: 'reply-123',
              content: '**balasan telah dihapus**',
              date: '2021-08-11T07:59:57.000Z',
              username: 'dicoding',
            },
          ],
        },
      ],
    };

    const mockDetailThread = new DetailThread({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:22:33.555Z',
      username: 'dicoding',
    });

    const mockDetailComment = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '2021-08-10T07:59:57.000Z',
        content: 'sebuah comment',
        is_deleted: true,
      },
    ];

    const mockDetailReply = [
      {
        id: 'reply-123',
        content: 'sebuah reply',
        date: '2021-08-11T07:59:57.000Z',
        username: 'dicoding',
        is_deleted: true,
        comment_id: 'comment-123',
      },
    ];

    const addCommentLike = new AddCommentLike({
      userId: 'user-123',
      commentId: 'comment-123',
      threadId: 'thread-123',
    });

    const mockCommentLike = [
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '2021-08-10T07:59:57.000Z',
        content: 'sebuah comment',
        is_deleted: true,
        likeCount: 1,
      }
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();
    const mockCommentLikeRepository = new CommentLikeRepository();

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailThread));
    mockCommentRepository.getAllCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailComment));
    mockCommentLikeRepository.likeComment = jest.fn()
      .mockImplementation(() => Promise.resolve(addCommentLike));
    mockCommentLikeRepository.getCommentLikesForEachComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockCommentLike));
    mockReplyRepository.getAllRepliesByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(mockDetailReply));  
    
    const getThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
      commentLikeRepository: mockCommentLikeRepository,
    });

    // Action
    const detailThread = await getThreadUseCase.execute(id);

    // Assert
    expect(detailThread).toStrictEqual(mockResult);
    expect(mockThreadRepository.getThreadById)
      .toBeCalledWith(id);
    expect(mockCommentRepository.getAllCommentsByThreadId)
      .toBeCalledWith(id);
    expect(mockReplyRepository.getAllRepliesByThreadId)
      .toBeCalledWith(id);
  });
});