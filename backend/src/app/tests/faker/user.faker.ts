import { UserSaveInterface } from '@models/user.model';
import faker from 'faker';

export const user: UserSaveInterface = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
