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
  const sql = `
    CREATE OR REPLACE FUNCTION on_update_timestamp()
    RETURNS trigger AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER accounts_on_update
    BEFORE UPDATE ON accounts
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `
  return db.runSql(sql, [])
};

exports.down = function(db) {
  const sql = `
    DROP TRIGGER accounts_on_update ON accounts;
    DROP FUNCTION on_update_timestamp();
  `
  return db.runSql(sql, []);
};

exports._meta = {
  "version": 1
};
