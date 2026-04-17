const { createReadStream, existsSync } = require("node:fs");
const { extname, join, normalize } = require("node:path");
const { createServer } = require("node:http");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const requestedPath = normalize(url.pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, requestedPath === "/" ? "index.html" : requestedPath);
  const target = existsSync(filePath) ? filePath : join(root, "index.html");

  response.writeHead(200, {
    "Content-Type": types[extname(target)] || "application/octet-stream",
  });

  createReadStream(target).pipe(response);
});

server.listen(port, host, () => {
  console.log(`CREAR website running at http://${host}:${port}`);
});
