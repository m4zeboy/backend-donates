import dotenv from 'dotenv';
import server from "./api/server.js"

dotenv.config();
const port = process.env.PORT;

server.listen(port)
console.log(`\n***  Server running in port ${port} ***\n`)