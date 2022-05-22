export interface IStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface IComment extends IStory {
  text: string;
  replies?: IComment[];
}

export interface IUser {
  id: string;
  created: number;
  submitted: number[];
  karma: number;
  about?: string;
}

export interface ILoginUser {
  name: string;
  email: string;
  created: number | null;
  karma: number | null;
  about?: string;
}

export interface IError {
  message: string;
}
