const ReplyRepository = require('../ReplyRepository');

describe('ReplyRepository Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const replyRepository = new ReplyRepository();

    // Action and Assert
    await expect(replyRepository.addReply({})).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyRepository.getAllRepliesByThreadId('')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyRepository.deleteReplyById('')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyRepository.checkReplyAvailabilityInComment('', '', '')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(replyRepository.checkReplyOwner('', '')).rejects.toThrowError('REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});