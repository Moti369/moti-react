import { observable } from 'mobx';

let user = InitData.user;

class UserStore {
    @observable name = user.name;
    @observable avatar = user.photo;
    @observable employeeNo = user.id;
}

export default new UserStore();