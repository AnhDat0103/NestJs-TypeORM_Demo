import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { CustomerDetails } from './customerDetails.entity';

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column()
  phone: string;


  @OneToOne(() => CustomerDetails, details => details.customer, {cascade: true})
  details: CustomerDetails;

}