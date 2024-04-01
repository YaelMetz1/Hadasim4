import { Request, Response, NextFunction } from "express";
import { AnyZodObject, z } from "zod";

export const dataSchema = z.object({
  body: z.object({
    id: z.string()
      .length(9, { message: "Id Must be exactly 9 digits long" }),
    streetNumber: z.number().positive(),
    birthDate: z.string().refine((value) => {
      const parsedDate = new Date(value);
      const currentDate = new Date();
      return parsedDate <= currentDate;
    }, { message: "This is a future date" }),
    phoneNumber: z.string()
      .length(7, { message: "Phone number Must be exactly 7 digits long" }),
    mobilePhoneNumber: z.string()
      .length(10, { message: "Cell Phone number Must be exactly 10 digits long" }),
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
      res.status(400).json({ error: error });
    }
  };