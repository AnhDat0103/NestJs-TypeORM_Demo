import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerReqDto } from './dto/customerReq.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    createCustomer(@Body() customerData: CustomerReqDto) {
        return this.customerService.create(customerData);
    }

    @Get()
    getAllCustomers() {
        return this.customerService.findAll();
    }
}
