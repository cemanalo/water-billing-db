'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.insert('accounts',
  ['account_id', 'first_name', 'last_name', 'address'],
  ['04-010609', 'Carlo Eugene', 'Manalo', 'Block 10, Lot 300 SNR Laguna']
);
};

exports.down = function(db) {
  return db.runSql(
    'DELETE FROM accounts WHERE account_id = ?',
    ['04-010609']
  );
};

exports._meta = {
  "version": 1
};
