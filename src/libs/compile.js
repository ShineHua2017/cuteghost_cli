const fs = require("fs");
const path = require("path");
const { Base64 } = require("js-base64");
const commander = require('commander');
const program = new commander.Command();

program.option('-e, --entry  <type>', 'output entry')
    .option('-j, --js  <type>', 'output js')
    .option('-h, --html <type>', 'output html')
    .option('-b, --base64', 'base64 Encode')
program.parse(process.argv);
const options = program.opts();

const target = {
    entry: path.resolve(__dirname, "../../dist"),
    js: "/bundle.js",
    html: '/index.html'
}

if (options.entry) target.entry = path.resolve(__dirname, `${options.entry}`);
if (options.js) target.js = path.resolve(__dirname, `${options.js}`);
if (options.html) target.html = path.resolve(__dirname, `${options.html}`);

let base64data = `data:application/javascript;charset=utf-8;`;
if (options.base64) base64data = `data:application/javascript;charset=utf-8;base64,`;

function readFile(filepath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

function writeFile(filepath) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filepath, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

if (options.base64) {
    readFile(`${target.entry}${target.js}`)
        .then(
            function(data) {

                base64data = base64data + `${Base64.encode(data)}`;
                readFile(`${target.entry}${target.html}`)
                    .then(
                        function(data) {
                            let strHtml = data.toString().replace(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi, `<script charset="UTF-8" src="${base64data}"></script>`);
                            fs.writeFileSync(`${target.entry}/grafa-encode.html`, strHtml, 'utf8');
                        },
                        function(err) {
                            console.log(err.message);
                        }
                    )
                    .catch(function(err) {
                        console.log(err.message);
                    });
            },
            function(err) {
                console.log(err.message);
            }
        )
        .catch(function(err) {
            console.log(err.message);
        });
} else {
    readFile(`${target.entry}${target.js}`)
        .then(
            function(data) {

                base64data = base64data + `${data}`;
                readFile(`${target.entry}${target.html}`)
                    .then(
                        function(data) {
                            let strHtml = data.toString().replace(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi, `<script charset="UTF-8" src="${base64data}"></script>`);
                            fs.writeFileSync(`${target.entry}/grafa-encode.html`, strHtml, 'utf8');
                        },
                        function(err) {
                            console.log(err.message);
                        }
                    )
                    .catch(function(err) {
                        console.log(err.message);
                    });
            },
            function(err) {
                console.log(err.message);
            }
        )
        .catch(function(err) {
            console.log(err.message);
        });
}