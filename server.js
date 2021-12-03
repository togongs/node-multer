const app = require("./app");
const Http = require("http");
const server = Http.createServer(app);
const port = 3000;

server.listen(port, () => {
  console.log(`server listen at http://localhost:${port}`);
});
