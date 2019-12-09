const helper = require('./server.lib-test.js');

const timeout = 30000;

// TODO what does the done parameter do?
/*
The done parameter is a non-official standard name for a function, a.k.a callback,
that informs the calling function that a task is completed.
*/
test('play a game', function(done) {
  helper.playGame(process.env.API_URL, done);
}, timeout);
