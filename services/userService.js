const { UserRepository } = require('../repositories/userRepository');
const { user } = require('../models/user');

class UserService {



    getAll(){
        return UserRepository.getAll()
    }

    create(item){
        const data = {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            password: item.password
        }

        const userEmail = this.search({email: item.email})
        const userPhoneNumber = this.search({phoneNumber: item.phoneNumber})

        if (userEmail || userPhoneNumber ){
            return null
        }else {
            return UserRepository.create(data)
        }
    }

    update(id, dataToUpdate){
        const user = this.search({id:id})
        if(user){
            return UserRepository.update(id,dataToUpdate)

        }else {
            return null
        }
    }

    delete(id){
        return UserRepository.delete(id)
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();