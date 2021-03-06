import { IAuthor } from 'app/shared/model/author.model';

export interface INotice {
  id?: number;
  title?: string;
  description?: string;
  authors?: IAuthor[];
}

export class Notice implements INotice {
  constructor(public id?: number, public title?: string, public description?: string, public authors?: IAuthor[]) {}
}
