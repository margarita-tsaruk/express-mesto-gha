class errorBadReq extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.export = errorBadReq;
