export default class User {
  _id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  sex: number;
  classNumber: number;
  birthday: string;
  school: string;

  constructor(args: any = {}) {
    this._id = args._id ?? undefined;
    this.username = args.username ?? "";
    this.password = args.password ?? "";
    this.name = args.name ?? "";
    this.email = args.email ?? "";
    this.phone = args.phone ?? "";
    this.avatar = args.avatar ?? null;
    this.sex = args.sex ?? null;
    this.classNumber = args.classNumber ?? null;
    this.birthday = args.birthday ?? "";
    this.school = args.school ?? "";
  }
}
