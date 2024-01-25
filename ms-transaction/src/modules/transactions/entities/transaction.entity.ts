import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransferType } from './transaction-type.entity';

export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'uuid' })
  accountExternalIdDebit: string;

  @Column({ type: 'uuid' })
  accountExternalIdCredit: string;

  @Column({ type: 'uuid' })
  correlationId: string;

  @Column()
  transferTypeId: number;

  @Column('decimal')
  value: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => TransferType, (transferType) => transferType.transactions)
  @JoinColumn({ name: 'transferTypeId' })
  transferType: TransferType;
}