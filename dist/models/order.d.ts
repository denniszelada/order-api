import { OrderStatus } from './orderStatus';
export default interface Order {
    complete: Boolean;
    quantity: Number;
    shipDate: Date;
    status: OrderStatus;
    userId: Number;
}
