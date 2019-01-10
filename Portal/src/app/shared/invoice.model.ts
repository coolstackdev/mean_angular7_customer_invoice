export class Invoice {
    _id: string;
    user: any;
    service: string;
    price: number;
    due: string;
    status: string;
    createdAt: Date;

    deserialize(data: any): Invoice {
        return <Invoice>Object.assign({}, {
            _id: data._id,
            user: data.user,
            service: data.service,
            price: data.price,
            due: data.due,
            status: data.status,
            createdAt: data.createAt
        });
    }
}