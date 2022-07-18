# jsBarcode commandline wrapper

This is a simple commandline wrapper for the [jsBarcode](https://github.com/lindell/JsBarcode) JavaScript library.

It accepts two properties: `--value` and `--options`.

- `--value` accepts a string as the barcode value

- `--options` accepts a stringified JSON object containing any or all of the options defined [here](https://github.com/lindell/JsBarcode#options).

The result is outputted to `stdout`, while any errors are outputted to `stderr`.

## Installation and Running

To run the project, first run the commmand:

```
npm install
```

[pkg](https://github.com/vercel/pkg) must be installed globally in order to package the project into an executable binary. The command for this is:

```
npm install pkg -g
```

To package the project, run the command:

```
npm run build
```

Modify the pkg options as needed within `package.json`.

## Examples

```
node index.js --value="123456789"

node index.js --value="987654321" --options="{\"width\": 30, \"height\": 15}"
```

Running the executable follows the same pattern.
