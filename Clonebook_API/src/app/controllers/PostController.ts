import { Request, Response } from "express";
import Post  from "../entity/Post";

class PostController {
  public async Create(req: Request, res: Response) {
    const { content, userId } = req.body;
    
    const newPost = {
      content,
      likes: 0,
      datetime: '2022-07-15 16:00:00',
      userId
    }

    const result = await Post.New(newPost)

    if (result.status == false) {
      res.status(result.statusCode).json({ error: result.error })
    }

    res.json({ msg: 'Post criado com sucesso!' })
  }
}

export default new PostController();
