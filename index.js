var http = require('http');
var readFile = require('fs').readFileSync;
var readDir = require('fs').readdirSync;
const encoding = {
    encoding: 'utf-8'
};

http.createServer(function (req, res) {
    try {
        var index = readFile('./index.html', encoding);
        var icons = readDir('.', encoding).filter(i => i.endsWith('.svg'));

        var rows = icons.map(file => {
            var splited = file.split('.');

            return '<tr><td>' + splited[0] + '</td><td>' + readFile(file, encoding) + '</td></tr>'
        });
        var realIndex = index.replace('{#replace}', rows.join(''));
        res.write(realIndex);
        res.end();
    } catch (error) {
        console.log(error);
    }
}).listen(8080);
console.log('server created at : http://localhost:8080');