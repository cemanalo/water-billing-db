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
  return db.createTable('accounts', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    account_id: 'string',
    first_name: 'string',
    last_name: 'string',
    address: 'string'
  })
};

exports.down = function(db) {
  return db.dropTable('accounts');
};

exports._meta = {
  "version": 1
};
