import { TDate } from './TDate';
import {
  Assessment,
  OperationType,
  OperationCompletedType,
} from '@/types/api/Operation';

export class Operation {
  id?: string | null; // ID Операции
  type: OperationType; // Тип операции
  date: TDate; // Дата проведения операции
  area: number; // Площадь проведения операции (Га)
  comment?: string | null; // Комментарий
  assessment?: Assessment | null; // Оценка качества проведенной операции
  completed: OperationCompletedType;
  image?: string;
  crop?: string;

  constructor(args: Operation) {
    const {
      id = null,
      type,
      date,
      area,
      comment = null,
      assessment = null,
      completed,
      image = null,
      crop = null,
    } = args;
    this.id = id;
    this.type = type;
    this.date = new TDate(date);
    this.area = area;
    this.comment = comment;
    this.assessment = assessment;
    this.completed = completed;
    this.image = image ?? '/example.png';
    this.crop = crop ?? 'Пшеница озимая';
  }
}
