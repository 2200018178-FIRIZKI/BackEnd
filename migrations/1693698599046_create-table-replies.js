
exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR',
      primaryKey: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'VARCHAR',
      notNull: true,
    },
    comment_id: {
      type: 'VARCHAR',
    },
    user_id: {
      type: 'VARCHAR',
    },
    is_deleted: {
      type: 'BOOLEAN',
      default: false,
    },
  });

  pgm.addConstraint('replies', 'fk_replies.comment_id_comments.id', 'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE');
  pgm.addConstraint('replies', 'fk_replies.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('replies', 'fk_replies.comment_id_comments.id');
  pgm.dropConstraint('replies', 'fk_replies.user_id_users.id');
  pgm.dropTable('replies');
};
