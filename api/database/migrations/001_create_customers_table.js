'use strict';

import db from '../../config/database.js';

export async function up() {
  const createTableSQL = `
    CREATE TABLE customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(30),
      coordinate_x DOUBLE PRECISION,
      coordinate_y DOUBLE PRECISION
    );
  `;

  await db.query(createTableSQL);
}

export async function down() {
  const dropTableSQL = 'DROP TABLE IF EXISTS customers CASCADE;';

  await db.query(dropTableSQL);
}
