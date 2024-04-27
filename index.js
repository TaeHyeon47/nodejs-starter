const fs = require('fs');
const http = require('http');

/////////////////////
// FilE

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written !');
//         console.log('git text')
//       });
//     });
//   });
// });
// console.log('Will read file!');

//////////////////////////
// SERVER

// 프로그램이 실행될 때 생성되므로 API 요청 시, 코드 실행을 막지 않음.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);


const server = http.createServer((req, res) =>{
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview');
  } else if (pathName === '/product') {
    res.end('This is the product');
  } else if (pathName === '/api') {
    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, {'Content-type' : 'application/json'})
      res.end(data)
    })
  } else {
    res.writeHead(404, {
      'Content-Type' : 'text/html',
      'my-own-header' : 'hello-world'
    });
    res.end('<h1>Page not found</h1>');
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
})