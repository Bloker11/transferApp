import { StatusCodes } from "http-status-codes";
export const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "There was an internal server error",
  };
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }
  if(err.code && err.code === 11000){
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg});
};
