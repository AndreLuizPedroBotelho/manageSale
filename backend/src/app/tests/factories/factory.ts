import { User } from '@models/user.model';
import faker from 'faker';
import factory from 'factory-girl';
import bcrypt from 'bcryptjs';

const objectUser = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

factory.define('User', User, {
  ...objectUser,
  passwordHash: async () => bcrypt.hash(objectUser.password, 8),
});

export default factory;
