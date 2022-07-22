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

## Usage in 4D

As a 4D Developer I call this from a method in my database that is run at server.

JS_Barcode(bracodeValue;optionsObject;codec) - Function returns an image (currently doing nothing with the err out)

```
C_TEXT($1; $3; $vt_path; $vt_script; $dqt)
C_OBJECT($2)
C_PICTURE($0; $vg_pict)
C_BLOB($vx_in; $vx_out; $vx_err; $vx_pict)
$dqt:=Char(Double quote)

$vt_barcode:=$dqt+$1+$dqt
$vt_barcodeParams:=$dqt+Replace string(JSON Stringify($2); $dqt; ("\\"+$dqt))+$dqt
$vt_codec:="svg" //Default Codec
If (Count parameters>2)
	$vt_codec:=$3
End if 
$vt_path:=Get 4D folder(HTML Root folder)+"jsBarcode"+Folder separator  //Set your own folder to store the .exe
$vt_script:=$vt_path+"jsbarcodecmd.exe --value="+$vt_barcode+" --options="+$vt_barcodeParams+" --codec="+$vt_codec

SET ENVIRONMENT VARIABLE("_4D_OPTION_HIDE_CONSOLE"; "true")
SET ENVIRONMENT VARIABLE("_4D_OPTION_BLOCKING_EXTERNAL_PROCESS"; "true")
LAUNCH EXTERNAL PROCESS($vt_script; $vx_in; $vx_out; $vx_err)
BASE64 DECODE($vx_out; $vx_pict)
BLOB TO PICTURE($vx_pict; $vg_pict; ("."+$vt_codec))
$0:=$vg_pict

/*Options for reference
	format        "auto"(CODE128)   String (CODE128, EAN13 / UPC; CODE39; ITF-14, MSI, Pharmacode, Codabar)
	width         2                 Number
	height        100               Number
	displayValue  true              Boolean
	text          undefined         String
	fontOptions   ""                String
	font          "monospace"       String
	textAlign     "center"          String
	textPosition  "bottom"          String
	textMargin    2                 Number
	fontSize      20                Number
	background    "#ffffff"         String (CSS color)
	lineColor     "#000000"         String (CSS color)
	margin        10                Number
	marginTop     undefined         Number
	marginBottom  undefined         Number
	marginLeft    undefined         Number
	marginRight   undefined         Number
	flat          false             Boolean
	valid         function(valid){} Function
*/

```
