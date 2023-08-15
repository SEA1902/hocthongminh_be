export default class Knowledge {
  _id: string;
  title: string;
  content: string;
  slug: string;

  constructor(args: any = {}) {
    this._id = args._id ?? undefined;
    this.title = args.title ?? "";
    this.content = args.content ?? "";
    this.slug = args.slug ?? "";
  }
}
