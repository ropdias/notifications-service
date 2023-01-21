import { Replace } from '@helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

// We are creating an interface to avoid conflicts between variable names and getters/setters names
// After creating a interface you can use like that:
// const notification = new Notification({content: 'asdasd', category: 'asdasd'})
// notification.content = 'asdasdsad';
export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null; // ? makes readAt be undefined. So in this case its like undefined | Date | null
  canceledAt?: Date | null;
  createdAt: Date;
}

// Here we are creating a entity named Notification
// Important note: Not necessarily one entity needs to be a table in a DB
// you can have one entity that can be saved like 2 or 3 tables in the DB
// For example you can have an entity class Order that has an variable OrderItem that is a table and other objects that are other tables
// export class Order {
//   private items: OrderItem[];
// }

export class Notification {
  private _id: string;
  private props: NotificationProps;

  // Here we are using a helper type that we create to make the createdAt variable to be optional
  // when passing to the constructor without making it optional in the interface NotificationProps by default
  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    // this.props = props;
    // Every entity will have an id so later we could sepparate the id in a class named BaseEntity for example
    // and make Notification implement that
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
