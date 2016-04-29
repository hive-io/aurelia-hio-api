import { CrudService } from './crud-service';

let UserModel = class UserModel {
  constructor(data, http) {
    Object.assign(this, data);
  }
};


export let UserService = class UserService extends CrudService {
  constructor() {
    super(UserModel, { singular: 'user', plural: 'users' });
  }
};