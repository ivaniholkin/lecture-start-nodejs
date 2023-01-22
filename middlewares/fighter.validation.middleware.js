const {fighter} = require('../models/fighter');

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const reqFighter = {
    name: req.body.name,
    power: req.body.power,
    defense: req.body.defense,
}
const reqFighter1 = {
    name: req.body.name,
    health: req.body.health,
    power: req.body.power,
    defense: req.body.defense,
}


if (!req.body.name || !req.body.power || !req.body.defense) {
    res.status(400).send("all fields must be filled")
} else {
    if (JSON.stringify(reqFighter) == JSON.stringify(req.body) || JSON.stringify(reqFighter1) == JSON.stringify(req.body)) {

        if (req.body.defense <= 100 && req.body.defense >= 1) {
            if (req.body.power <= 100 && req.body.power >= 1) {
                if ((req.body.health <= 120 && req.body.health >= 80) || !req.body.health) {
                    next()
                } else {
                    res.status(400).send("health - 80 < health < 120")
                }

            } else {
                res.status(400).send("power - 1 < power < 100")
            }

        } else {
            res.status(400).send("defense - 1 < defense < 100")

        }

    } else {
        res.status(400).send("added extra fields")

    }

}


};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  if (req.body.name || req.body.power || req.body.health || req.body.defense) {
  next();
} else {
  res.status(400).send("When updating the fighter - there must be at least one field")
}
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;