import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, id } = request.query;

      const query = knex<ProductRepository>("products").select();

      if (name) {
        query.whereLike("name", `%${name}%`);
      }

      if (id) {
        query.where("id", id);
      }

      const products = await query.orderBy("name");

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "value must be greater than zero" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "value must be" })
        .parse(request.params.id);

        const bodySchema = z.object({
          name: z.string().trim().min(6),
          price: z.number().gt(0, { message: "value must be greater than zero" }),
        });
        
        const { name, price } = bodySchema.parse(request.body);

        const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first()
  
        if(!product){
          throw new AppError("Product not found", 404);  // 404 Not Found
        }

        await knex<ProductRepository>("products").update({name , price, updated_at: knex.fn.now()})
        .where({id});

      return response.json();
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
      .string()
      .transform((value) => Number(value))
      .refine((value) => !isNaN(value), { message: "value must be" })
      .parse(request.params.id);

      const product = await knex<ProductRepository>("products")
      .select()
      .where({ id })
      .first()

      if(!product){
        throw new AppError("Product not found", 404);  // 404 Not Found
      }
      await knex<ProductRepository>("products").delete().where({ id });

      return response.json();
    }catch (error){
      next(error);
    }
  }
}
export { ProductController };
