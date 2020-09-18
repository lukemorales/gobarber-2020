module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'gobarber',
  entities: ['./src/models/*.ts'],
  synchronize: true,
  migrationsRun: false,
  // logging: true,
  // logger: 'advanced-console',
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
