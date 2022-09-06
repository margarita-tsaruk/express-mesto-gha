class errorServer extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.export = errorServer;
