import { Entity, PrimaryGeneratedColumn, Column, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class UserSession {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @Column()
  email: string;


  /**
   * DB insert time.
   */
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt: Date;

  /**
   * DB last update time.
   */
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt: Date;

}

const getUserSessionRepository = () => {
  return getRepository(UserSession);
};

export { UserSession, getUserSessionRepository };
