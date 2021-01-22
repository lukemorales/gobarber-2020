module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'docker',
  database: 'gobarber',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  synchronize: false,
  migrationsRun: true,
  // logging: true,
  // logger: 'advanced-console',
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
