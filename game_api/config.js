module.exports = function(context) {
  return {
    // Postgres
    pgHost: process.env.POSTGRES_HOST || 'my_postgres_container',
    pgUser: process.env.POSTGRES_USER || 'my_postgres_user',
    pgPassword: process.env.POSTGRES_PASSWORD || 'my_postgres_password',
    pgDatabase: process.env.POSTGRES_DB || 'my_postgres_database',

    // Port
    port: process.env.PORT || 3000,
  };
};
