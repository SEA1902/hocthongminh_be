export default class Question {
  _id: string;
  topicId: string;
  level: number;
  name: string;
  quizChoice: [string];
  answer: number;
  explain: string;
  constructor(args: any = {}) {
    this._id = args._id ?? undefined;
    this.topicId = args.topicId ?? null;
    this.level = args.level ?? null;
    this.name = args.name ?? "";
    this.quizChoice = args.quizChoice ?? null;
    this.answer = args.answer ?? null;
    this.explain = args.explain ?? "";
  }
}
