const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {


    getAll(){
        return FighterRepository.getAll()
    }

    create(item){
        const data = {
            name: item.name,
            health: item.health || 100,
            power: item.power,
            defense: item.defense,
        }

        const fighterName = this.search({name: item.name})

        if (fighterName ){
            return null
        }else {
            return FighterRepository.create(data)
        }
    }

    update(id, dataToUpdate){
        const fighter = this.search({id:id})
        if(fighter){
            return FighterRepository.update(id,dataToUpdate)

        }else {
            return null
        }
    }

    delete(id){
        return FighterRepository.delete(id)
    }

    search(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new FighterService();