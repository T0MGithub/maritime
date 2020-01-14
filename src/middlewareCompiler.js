/**
 * CREDIT: Middleware compiler adapted from NPM module koa-compose.
 * 
 * @param {list} List of middleware functions to compile to one function
 * @returns {function}
 */

module.exports = function(middleware) {
  // return function to execute compiled middleware chain
  return function(data, next) {
    // set pointer to 0 to match middleware index to track if next()
    // is called twice in one middleware
    let pointer = 0;
    function dispatch(i) {
      // check if pointer is larger than i, indicating next() was called more than once
      if (i < pointer)
        return Promise.reject(
          new Error("next() called multiple times in one middleware function.")
        );
      // set pointer to next index
      pointer = i + 1;
      // grab current function
      let fn = middleware[i];
      // if out of middleware, assign the next function from the parameters to be executed next
      if (i === middleware.length) fn = next;
      // if no function (out of middleware and no provided parameter), end middleware execution
      if (!fn) return Promise.resolve();
      try {
        // run next function, binding the second parameter to the next middleware in the chain
        return Promise.resolve(fn(data, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    // start function on first middleware
    return dispatch(0);
  };
};
