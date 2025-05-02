import { Config } from "./config";

export class Constant {
  public static LIARA = "https://alvar-api.liara.run/";
  public static DOMAIN  = "http://alverproduct.com/api/";

  public static getApp(): string {
    return Config.DEVELOP_MODE ? Constant.LIARA : Constant.DOMAIN;
  }
}
