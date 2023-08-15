export default class Course {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  gradeId: string;
  constructor(args: any = {}) {
    this._id = args._id ?? undefined;
    this.name = args.name ?? "";
    this.description = args.description ?? "";
    this.slug = args.slug ?? "";
    this.image = args.image ?? "";
    this.gradeId = args.gradeId ?? "";
  }
}
