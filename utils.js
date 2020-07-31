var printf = (text, color = CONSOLE_COLOR.WHITE) => process.stdout.write(`${color}${text}${CONSOLE_COLOR.DEFAULT}`);

const CONSOLE_COLOR = {
  WHITE: "\033[1;39m",
  RED: "\033[1;31m",
  GREEN: "\033[1;32m",
  DEFAULT: "\033[1;39m",
  YELLOW: "\033[1;93m",
  MAGENTA: "\033[1;95m",
};

module.exports = { printf, CONSOLE_COLOR };
