import { Customer } from "../models/customer";
import { DatabaseProvider } from "../database";

export class CustomerService {

    public async getById(id: number) : Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).findOne({id}) as Customer
    };

    public async create(customer : Customer) : Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).save(customer);
    }

    public async list() : Promise<Customer[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).find();
    }

    public async update(customer: Customer) : Promise<Customer> {
        const connection = await DatabaseProvider.getConnection();
        const customerRepository = connection.getRepository(Customer);
        const entity = await customerRepository.findOne({id : customer.id}) as Customer;

        entity.firstName = customer.firstName;
        entity.lastName = customer.lastName;

        return await customerRepository.save(entity);
    }

    public  async delete(id: number) : Promise<any>{
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Customer).delete(id)
    }

}


export const customerService = new CustomerService();