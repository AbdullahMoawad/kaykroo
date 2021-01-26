import {Column, CreateDateColumn, Entity, getRepository, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {getUserSessionRepository, UserSession} from './UserSession';
import {generateRandomString} from '../util/string';

@Entity()
class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  public createdAt: Date;

  @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
  public updatedAt: Date;

  public async generateSession() {
    const session = new UserSession();
    session.userId = this.id;
    session.token = generateRandomString(50);
    session.email = this.email;
    return await getUserSessionRepository().save(session);
  }

  public unsafeFields() {
    return ['password'];
  }
}

const getUserRepository = () => {
  return getRepository(User);
};

export {User, getUserRepository};
