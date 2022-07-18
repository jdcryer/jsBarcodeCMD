var JsBarcode = require("jsbarcode");
const { DOMImplementation, XMLSerializer } = require("xmldom");
var argv = require("minimist")(process.argv.slice(2));

const xmlSerializer = new XMLSerializer();
const document = new DOMImplementation().createDocument(
  "http://www.w3.org/1999/xhtml",
  "html",
  null
);
const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");

if (argv[`value`] === undefined)
  throw new Error("Barcode value not specified.");

let options = {
  xmlDocument: document,
};

try {
  if (argv[`options`] !== undefined) {
    const opts = JSON.parse(argv[`options`]);
    options = { ...options, ...opts };
  }
} catch (err) {
  throw new Error(`Malformed json: \n\n${err}`);
}

try {
  JsBarcode(svgNode, argv[`value`], options);
} catch (err) {
  throw new Error(`Failed to generate barcode: \n\n${err}`);
}

try {
  const svgText = xmlSerializer.serializeToString(svgNode);
  console.log(svgText);
} catch (err) {
  throw new Error(`Failed to turn XML to string: \n\n${err}`);
}
