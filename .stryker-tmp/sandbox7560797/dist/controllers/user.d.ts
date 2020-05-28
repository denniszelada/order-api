import { NextFunction, Request, Response } from 'express';
export declare let getUser: (req: Request, res: Response, next: NextFunction) => Response<any>;
export declare let addUser: (req: Request, res: Response, next: NextFunction) => Response<any>;
export declare let updateUser: (req: Request, res: Response, next: NextFunction) => Response<any>;
export declare let removeUser: (req: Request, res: Response, next: NextFunction) => Response<any>;
