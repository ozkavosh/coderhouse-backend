const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerWarnFile: { type: "file", filename: "warn.log" },
    miLoggerErrorFile: { type: "file", filename: "error.log" },
    errorLogger: {
      type: "logLevelFilter",
      appender: "miLoggerErrorFile",
      level: "error",
      maxLevel: "error",
    },
    warnLogger: {
      type: "logLevelFilter",
      appender: "miLoggerWarnFile",
      level: "warn",
      maxLevel: "warn",
    },
  },
  categories: {
    default: {
      appenders: ["miLoggerConsole", "errorLogger", "warnLogger"],
      level: "all",
    },
  },
});

const log = log4js.getLogger();

const routeLogger = (req, res, next) => {
  log.info(`${req.baseUrl}${req.path} method ${req.method}`);
  return next();
};

const invalidRouteLogger = (req, res, next) => {
  log.warn(
    `${req.baseUrl}${req.path} method ${req.method} not yet implemented`
  );
  return next();
};

const errorLogger = (error) => {
  log.error(error.message);
};

module.exports = {
  routeLogger,
  invalidRouteLogger,
  errorLogger,
};
