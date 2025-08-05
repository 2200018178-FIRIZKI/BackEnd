
exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'VARCHAR',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR',
    },
  });

  pgm.addConstraint('threads', 'fk_threads.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('threads');
};
