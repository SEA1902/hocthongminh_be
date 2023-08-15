export default class Topic {
  _id: string;
  type: number;
  chapterNumber: number;
  chapterTitle: string;
  topicNumber: number;
  topicName: string;
  topicTitle: string;
  timeLimit: number;
  courseId: string;
  constructor(args: any = {}) {
    this._id = args._id ?? undefined;
    this.type = args.type ?? null;
    this.chapterNumber = args.chapterNumber ?? null;
    this.chapterTitle = args.chapterTitle ?? "";
    this.topicNumber = args.topicNumber ?? null;
    this.topicName = args.topicName ?? "";
    this.topicTitle = args.topicTitle ?? "";
    this.timeLimit = args.timeLimit ?? null;
    this.courseId = args.courseId ?? null;
  }
}
