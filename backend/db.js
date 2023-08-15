const Pool = require("pg").Pool;

const pool = new Pool({
  user: "notemaker",
  password: "Nhn7Iht6MVwqVbUrOQ5CWAJYRfEb0gvK",
  host: "dpg-cjdpn3rbq8nc73b6vsng-a.singapore-postgres.render.com",
  port: 5432,
  database: "tododb_m5my",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports=pool;