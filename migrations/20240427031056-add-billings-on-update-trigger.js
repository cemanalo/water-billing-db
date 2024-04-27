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
    CREATE OR REPLACE FUNCTION on_update() RETURNS trigger AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER billings_on_update
    BEFORE UPDATE ON billings
    FOR EACH ROW
    EXECUTE PROCEDURE on_update();
  `;
  return db.runSql(sql, []);
};

exports.down = function(db) {
  const sql = `
    DROP TRIGGER billings_on_update ON billings;
    DROP FUNCTION on_update();
  `
  return db.runSql(sql, []);
};

exports._meta = {
  "version": 1
};
