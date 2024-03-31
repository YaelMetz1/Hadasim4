import {Request, Response, NextFunction } from "express";
import { AnyZodObject, z } from "zod";

export const dataSchema = z.object({
    body: z.object({
      patientId: z.number().positive(),
      vaccinationDate:  z.string().refine((value) => {
        const parsedDate = new Date(value);
        const currentDate = new Date();
        return parsedDate <= currentDate;
      }, { message: "vaccinationDate is a future date" }),
    }),
  });

  export const validate = (dataSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await dataSchema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
        res.status(400).json({error: error});
    }
};