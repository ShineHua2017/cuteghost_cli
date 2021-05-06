const fs = require("fs");
const path = require("path");
const { Base64 } = require("js-base64");
const target = {
    entry: path.resolve(__dirname, "../../dist"),
    js: "/bundle.js",
    html: '/index.html'
}

let base64data = "";

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

readFile(`${target.entry}${target.js}`)
    .then(
        function(data) {

            base64data = `data:application/javascript;charset=utf-8;base64,${Base64.encode(data)}`;
            readFile(`${target.entry}${target.html}`)
                .then(
                    function(data) {
                        let strHtml = data.toString().replace(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi, `<script src="${base64data}"></script>`);
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