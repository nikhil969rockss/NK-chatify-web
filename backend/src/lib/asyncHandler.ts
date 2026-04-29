import type { Response, NextFunction } from "express";

export const asyncHandler = (
  handlerFn: (
    req: IApiRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
) => {
  return async (req: IApiRequest, res: Response, next: NextFunction) => {
    try {
      await handlerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
