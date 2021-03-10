import {Request, Response} from 'express';

export class SessionController {
  async createSession(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}
