export class User {
    _id: string;
    firstName: string;
    lastName: string;
    company: string;
    logoUrl: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    password: string;
    createdAt: Date;

    deserialize(data: any): User {
        return <User>Object.assign({}, {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            company: data.company,
            logoUrl: data.logoUrl,
            email: data.email,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
            createdAt: data.createdAt
        });
    }
}