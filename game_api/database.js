module.exports = function(context) {
  //const Client = context('pgClient');
  const configConstructor = context('config');
  const config = configConstructor(context);


  /**
   * This function gets the client
   * @return {Client}
   */
  //function getClient() {
  //  return new Client({
  //    host: config.pgHost,
  //    user: config.pgUser,
  //    password: config.pgPassword,
  //    database: config.pgDatabase,
  //  });
  //}

  return {
    insertResult: (won, score, total, onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
          client.end();
        } else {
          const query = {
            text: 'INSERT INTO "GameResult" ("Won", "Score", "Total", "InsertDate") VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
            values: [won, score, total],
          };
          client.query(query, (err) => {
            if (err) {
              onError(err);
            } else {
              onSuccess();
            }
            client.end();
          });
        }
      });
      return;
    },
    // Should call onSuccess with integer.
    getTotalNumberOfGames: (onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
          client.end();
        } else {
          const query = {
            text: 'SELECT COUNT(*) FROM GameResult;',
          };
          client.query(query, (err) => {
            if (err) {
              onError(err);
            } else {
              onSuccess(0);
            }
            client.end();
          });
        }
      });
      return;
    },
    // Should call onSuccess with integer.
    getTotalNumberOfWins: (onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
          client.end();
        } else {
          const query = {
            text: 'SELECT COUNT(SELECT Won FROM GameResult WHERE Won=true) FROM GameResult;',
          };
          client.query(query, (err) => {
            if (err) {
              onError(err);
            } else {
              onSuccess(0);
            }
            client.end();
          });
        }
      });
      return;
    },
    // Should call onSuccess with integer.
    getTotalNumberOf21: (onSuccess, onError) => {
      const client = getClient();
      client.connect((err) => {
        if (err) {
          onError(err);
          client.end();
        } else {
          const query = {
            text: 'SELECT COUNT(SELECT Total FROM GameResult WHERE Total=21) FROM GameResult;',
          };
          client.query(query, (err) => {
            if (err) {
              onError(err);
            } else {
              onSuccess(0);
            }
            client.end();
          });
        }
      });
      return;
    },
  };
};
