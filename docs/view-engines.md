# Rendering Engines

Rendering/view engines are used within Maritime to render view templates for webpages. Templates allow for dynamic webpages to easily be created. Although you can render a template and send it to the client using `data.res.send()`, a rendering engine can be mounted to streamline this process. Several rendering engines are included within Maritime and a user may mount a custom view engine.

## Rendering Engines for Maritime

- 🔧 [(Integrated) EJS Engine]() - EJS engine included with Maritime to render EJS templates.
- 📕 [(Integrated) Handlebars Engine]() - Handlebars engine included with Maritime to render Handlebar templates.
- ✨ [(Integrated) Pug/Jade Engine]() - Pug/Jade engine included with Maritime to render Pug/Jade templates.

## Usage

You can mount a view engine within Maritime by creating an engine object and setting it within the app with the value `rendering-engine`. Integrated engines are located in the Maritime library at `Maritime.renderingEngines.ENGINE_NAME`.

```js
const engine = new Maritime.renderingEngine.ejs({
  views: __dirname + "/views"
});
app.set("rendering-engine", engine);
```

You can also create a view engine using the included helper function, which takes the name of the engine and an options object and returns a created rendering engine object.

```js
const engine = Maritime.renderingEngine("ejs", {
  views: __dirname + "/views"
});
app.set("rendering-engine", engine);
```

Once mounted, a rendering engine can be used to render a template and send the data to the client with the function `data.res.render()`. The path provided should be relative to the view folder provided in the engine options.

```js
router.get("*", data => {
  return data.res.render("./template.ejs");
});
```

## Engine Internals

If you wish to create a rendering engine, you must be aware of how an engine is structured. Each engine must be a class and contain at least a `constructor()` function to initialize the engine with the provided options, and a `render()` function to take in template path, render data and options and return the contents of the rendered template to be sent to the client.

```js
class RenderingEngine {
  /**
   * Function to initialize and prepare the engine.
   *
   * @param {Object} [options] Options object.
   * @param {String} [options.views] Required to act as the base directory for view templates.
   */
  constructor(options = {}) {}

  /**
   * Function to render template specified template, in order to be sent to client.
   *
   * @param {String} [templatePath] Relative path (to views base directory) of the template.
   * @param {Object=} [renderData] Data to render template with.
   * @param {Object=} [renderOptions] Template rendering options.
   * @return {String} Rendered template data.
   */
  render(templatePath, renderData = {}, renderOptions = {}) {}
}
```
