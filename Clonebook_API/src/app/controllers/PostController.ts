import { Request, Response } from "express";

class PostController {
  public home(req: Request, res: Response) {
    return res.json({
      response: 'Hello World'
    });
  }
}

export const firstController = new PostController();
