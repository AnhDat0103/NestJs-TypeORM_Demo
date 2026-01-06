import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Customer } from "./customer.entity";

@Entity()
export class CustomerDetails{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    company: string;

    @OneToOne(() => Customer, customer => customer.details)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;
}