export class Question {
  id: number = 0;
  shortName: string = "";
  questionDetail: string = "";
  optionA: string = "";
  optionB: string = "";
  optionC: string = "";
  optionD: string = "";
  correctAnswer: string = "";
  reportQuestion: string = "";
  creationDate!: Date;
}
