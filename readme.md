# jsBarcode Command Line Wrapper

This is a simple command line wrapper for the [jsBarcode](https://github.com/lindell/JsBarcode) JavaScript library.

It accepts three properties: `--value`, `--options`, and `--codec`.

- `--value` accepts a string as the barcode value (REQUIRED)

- `--codec` accepts a string specifying either "png" or "svg". If "png" is specified, a base64 string will be returned. If "svg" is specified, an svg string will be returned.  (REQUIRED)

- `--options` accepts a stringified JSON object containing any or all of the options defined [here](https://github.com/lindell/JsBarcode#options). (OPTIONAL)


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

`pkg` is unable to compile `Sharp`'s additional required binaries into the executable, so specific files and folders from `node_modules` need to be moved to be next to the executable on the target machine. `Sharp` binaries for Windows are already included in this repository , in a folder named `sharp`. 

## Examples

```
node index.js --value="123456789" --codec="svg"

node index.js --value="987654321" --options="{\"width\": 30, \"height\": 15}" --codec="png"
```

Running the executable follows the same pattern.
