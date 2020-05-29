import { Response } from 'express';
import { ApplicationType } from '../models/applicationType';
export declare let formatOutput: (res: Response, data: any, statusCode: number, applicationType: ApplicationType) => Response<any>;
