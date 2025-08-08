class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stark = "") {
    super(message); //thow new error ("sending error message");
    this.statusCode = statusCode;

    if (stark) {
      this.stack = stark;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
