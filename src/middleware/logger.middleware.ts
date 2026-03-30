import { Inject, Injectable, MiddlewareConsumer, NestMiddleware, NestModule } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
console.log(req.method, req.baseUrl, req.url)  ;
next();  }
    

}