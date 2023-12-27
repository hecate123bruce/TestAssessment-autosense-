import { Request } from "express";

type UserType = {
  id: string;
  email: string;
};

export interface AuthRequest<Param, ResBody, ReqBody, ReqQuery>
  extends Request<Param, ResBody, ReqBody, ReqQuery> {
  user: UserType;
}
