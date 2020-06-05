import { Request, Response, NextFunction, Router } from "express";
import { getRepository, getConnection, getManager } from "typeorm";
import { Application } from "../../entity/manager/Application";

export default class ApiApplicationController {
  public path = '/rest';
  public router = Router();

  constructor() {
    this.initialRoutes();
  }

  public initialRoutes() {
    this.router.get("/applications", this.getApplications);

  }
  
  getApplications = async(req: Request, res: Response, next: NextFunction) => {
    const applicationRepo = getRepository(Application);
    
    try {
      const applications = await applicationRepo.find({
        relations: ["apis", "apis.columns"]
      })
      res.json(new ApiResponse("", applications));
    } catch (err) {
      console.error(err);
      res.status(503).json(new ApiResponse("", undefined, err));
      return;
    }
  }
}

class ApiResponse {
  message: String = ""
  code: number
  data: any
  error: Error

  constructor(message?: string, data?: any, error?: Error) {
    if(message) this.message = message;
    if(data) this.data = data;
    if(error) this.error = error;
  }

  get json(): {} {
    const json = {}
    if(this.error) {
      json["code"] = "0001";
      json["message"] = this.error.message;
    } else {
      json["data"] = this.data
      json["message"] = this.message
    }
    return json;
  }
}