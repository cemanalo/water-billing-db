"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("billings", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    fk_accounts_id: "string",
    billing_notice: "string",
    covered_from: "date",
    covered_to: "date",
    connection_type: "string",
    meter_number: "string",
    previous_reading: "int",
    present_reading: "int",
    consumption: "int",
    current_month_bill: "decimal",
    arrears: "decimal",
    total_amount_due: "decimal",
    due_date: "date",
    disconnection_date: "date",
  });
};

exports.down = function (db) {
  return db.dropTable('billings');
};

exports._meta = {
  version: 1,
};
