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
  const tableName = 'billings'
  const columnName = 'updated_at'
  const columnSpec = {
    type: 'timestamp',
    notNull: true,
    defaultValue: new String('CURRENT_TIMESTAMP')
  }
  return db.addColumn(tableName, columnName, columnSpec)
};

exports.down = function(db) {
  const tableName = 'billings'
  const columnName = 'updated_at'
  return db.removeColumn(tableName, columnName)
};

exports._meta = {
  "version": 1
};
