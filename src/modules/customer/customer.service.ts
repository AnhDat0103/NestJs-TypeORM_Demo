import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerReqDto } from './dto/customerReq.dto';
import { CustomerDetails } from './entities/customerDetails.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly dataSource: DataSource,
    ){}

    findAll(): Promise<Customer[]>{
        return this.customerRepository.find();
    }

    findOne(id: number): Promise<Customer | null> {
        return this.customerRepository.findOneBy({id});
    }

    // async create(customerData: Partial<Customer>): Promise<Customer> {
    //     const customer = this.customerRepository.create(customerData);
    //     return this.customerRepository.save(customer);
    // }

    async create(customerData : CustomerReqDto) {
        await this.dataSource.transaction(async manager => {
            const customer = manager.create(Customer, {
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
            });

            const details = manager.create(CustomerDetails, {
                address: customerData.address,
                company: customerData.company,
            });

            details.customer = customer;
            await manager.save([customer, details]);
        });
    }


}
