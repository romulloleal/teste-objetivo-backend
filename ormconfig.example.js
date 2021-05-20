module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "insecureAuth": true,
  "entities": [
    process.env.TYPEORM_ENTITIES
  ],
  "migrations": [
    process.env.TYPEORM_MIGRATIONS
  ],
  "cli": {
    "migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR
  }
}
