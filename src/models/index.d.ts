import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Category {
  readonly id: string;
  readonly category_name?: string;
  readonly Reminders?: (Reminder | null)[];
  constructor(init: ModelInit<Category>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

export declare class Reminder {
  readonly id: string;
  readonly name?: string;
  readonly date?: string;
  readonly store?: string;
  readonly categoryID: string;
  constructor(init: ModelInit<Reminder>);
  static copyOf(source: Reminder, mutator: (draft: MutableModel<Reminder>) => MutableModel<Reminder> | void): Reminder;
}