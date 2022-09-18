var config = {};

config["database"] = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "sample",
    "port": 3306
};

config["session"] = {
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
};

config["cookieSession"] = {
  name: 'session',
  secret: 'express',
  maxAge: 24 * 60 * 60 * 1000
}

config["enableProfiler"] = true;

config["ProfilerList"] = {
    benchmark: true,
    get: true,
    memory_usage: false,
    post: true,
    session: true,
    query: true,
    uri: true,
    headers: false,
    controller: true
}

config["encryptionKey"] = "(00|_3n(rYp+!0n_k3Y";
config["csrf"] = { cookie: true };
config["bodyParser"] = { extended: true };
config["cookieParserKey"] = "secret";
config["port"] = 8888;

module.exports = config;