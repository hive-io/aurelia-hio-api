import {CrudService} from './crud-service';

class UserModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
}

export class UserService extends CrudService {
  constructor() {
    super(UserModel, { singular: 'user', plural: 'users' });
  }
}
