const AuthorizationError = require('./AuthorizationError');
const InvariantError = require('./InvariantError');
const NotFoundError = require('./NotFoundError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
  'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena tipe data tidak sesuai'),
  'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada'),
  'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat comment baru karena tipe data tidak sesuai'),
  'DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat menghapus comment karena properti yang dibutuhkan tidak ada'),
  'DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat menghapus comment karena tipe data tidak sesuai'),
  'ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat reply baru karena properti yang dibutuhkan tidak ada'),
  'ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat reply baru karena tipe data tidak sesuai'),
  'DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat menghapus reply karena properti yang dibutuhkan tidak ada'),
  'DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat menghapus reply karena tipe data tidak sesuai'),
  'ADD_COMMENT_LIKE.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat menambahkan like pada comment karena properti yang dibutuhkan tidak ada'),
  'ADD_COMMENT_LIKE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat menambahkan like pada comment karena tipe data tidak sesuai'),

  'THREAD_REPOSITORY_POSTGRES.THREAD_NOT_FOUND': new NotFoundError('tidak dapat menemukan thread yang dicari'),
  'COMMENT_REPOSITORY_POSTGRES.COMMENT_NOT_FOUND': new NotFoundError('tidak dapat menemukan comment yang dicari'),
  'REPLY_REPOSITORY_POSTGRES.REPLY_NOT_FOUND': new NotFoundError('tidak dapat menemukan reply yang dicari'),

  'COMMENT_REPOSITORY_POSTGRES.NOT_THE_COMMENT_OWNER': new AuthorizationError('tidak dapat menghapus comment karena user bukan pemilik comment'),
  'REPLY_REPOSITORY_POSTGRES.NOT_THE_REPLY_OWNER': new AuthorizationError('tidak dapat menghapus reply karena user bukan pemilik reply'),
};

module.exports = DomainErrorTranslator;
