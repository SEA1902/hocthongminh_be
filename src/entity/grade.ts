export default class Grade {
  _id: string;
  classNumber: number;
  title: string;
  desciption: string;

  constructor(args: any = {}) {
    this._id = args._id ?? undefined;
    this.title = args.title ?? "";
    this.desciption = args.desciption ?? "";
    this.classNumber = args.classNumber ?? null;
  }
}
