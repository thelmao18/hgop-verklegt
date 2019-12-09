# Answers to questions.

## Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.

We put each consecutive call inside the onSuccess callback of the previous
database call to allow the code to continue without having to wait for each
call between services to finish. This would not be a good idea if we were writing to a database where the order is important, but in this case we are reading from a database that should not change while we make these calls.

## What does the done parameter do?

The done parameter is a non-official standard name for a function, a.k.a callback, that informs the calling function that a task is completed.
