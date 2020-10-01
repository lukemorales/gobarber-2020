class AppError {
  constructor(public readonly message: string, public readonly status = 400) {
    this.message = message;
    this.status = status;
  }
}

export default AppError;
