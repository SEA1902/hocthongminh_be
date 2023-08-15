export default class UserTopicResult {
  _id: string;
  answer: [number];
  score: number;
  userTopicId: string;
  constructor(args: any = {}) {
    this._id = args._id ?? undefined;
    this.answer = args.answer ?? [];
    this.score = args.score ?? null;
    this.userTopicId = args.userTopicId ?? "";
  }
}
