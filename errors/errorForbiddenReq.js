class errorForbiddenReq extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.export = errorForbiddenReq;
