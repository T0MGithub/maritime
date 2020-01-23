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
