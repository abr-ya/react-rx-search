const fs = require("fs");
// здесь необходимо перечислить ключи из файла ENV, а точнее - из ENV netlify
fs.writeFileSync("./.env", `API_KEY=${process.env.API_KEY}\n`);
