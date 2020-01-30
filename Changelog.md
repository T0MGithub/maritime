# 0.3 - xx/xx/2020

### Added
- Added some JSDoc documentation.
- You can now provide `res.download(path, altName)` an altName which will be set as the name of the file the client downloads.

### Fixed
- Fixed `res.sendStatus(statusCode)` error due to duplicate status variables on response object. You can know set the reponse status with `res.status = statusCode` or `res.setStatus(statusCode)`.

### Changed
- `res.download()` and `res.sendFile` now both resolve provided paths allowing them to contain relative path arguments such as `../`.
- Changed it so rebasing a router with `router.applyRoutingEngine()` now applies the provided base to all new routes.
- Dependancies required for `bodyParser()` middleware are no longed installed by default.
- `res.status(statusCode)` renamed to `res.setStatus(statusCode)`.
- Moved to consistent capitalization of `UTF-8` in response headers.

# 0.2.1 - 25/01/2020

### Fixed

- [422e539](https://github.com/T0MGithub/maritime/commit/5c060840a595c06775b1c07252fdb56571ea8dc8) - Don't activate routing engines until routers are mounted, to allow unsafe routes on routers that temporarily have the wrong engine.

# 0.2.0 - 25/01/2020

### Changed

- Moved to express-style routing syntax by default.

### Added

- Dynamic routing engine system. Different routing engines can be applied to support different routing syntaxes. Routing engines can be applied globally through `app.set("routing-engine", engine)` or router specifically through the router options like `new Maritime.router({engine: engine});`

# 0.1.2 - 23/01/2020

### Fixed

- Fixed file lookup with `data.res.sendFile()` and `data.res.download()` - either an absolute file path must be provided or a base directory must be set using `app.set("static-folder", file)`, to avoid relative path lookup confusion.

# 0.1.1 - 22/01/2020

### Fixed

- Fixed `data.res.download(filePath)` sending the file's name as the file contents instead of the actual file contents.

# 0.1.0 - 22/01/2020

### Added

- Added Jade alias for Pug rendering engine, for example in `Maritine.renderingEngine("jade")`.
- Added `data.res.download(filePath)` to make a client download a file.
- Added getters and setters for `data.res.status` so you can now set a status like `data.res.status = 404` or get the status like `data.res.status`.
- Added `data.res.send()` default parameter of an empty string.

### Changed

- `X-Powered-By` header is disabled by default in production mode for security.

### Fixed

- Fixed errors when using regexp for routing paths.

# 0.0.3 - 21/01/2020

### Added

- `res.status(status)` function to set the status of the response.
- `res.sendStatus(status)` function to set a status and send a body with the relevant status code to the client.
- Added set method for cookies object in data, so `data.cookies = val` successfully overwrites relevant object.
- Added construction function for rendering engines - `Maritime.renderingEngines(engine, options)` can be used to construct the appropriate engine.

### Changed

- Rendering engines now require `options.views` argument.
- Routing wildcards can now be placed anywhere in routes.

# 0.0.2 - 19/01/2020

### Added

- Added method override middleware - can be utilised by `app.use(Maritime.methodOverride())`.

### Changed

- Re-wrote request handler so changes on the req object due to middleware affects route matching.

# 0.0.1 - 19/01/2020

- Initial full publish of Maritime 🎉🎉🎉
