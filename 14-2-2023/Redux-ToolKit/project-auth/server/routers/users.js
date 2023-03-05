const express = require("express");
const paginate = require('../services/paginate.service')
const { User } = require('../models/user')
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();
const serializer = (user) => {
  return user.toObject({ versionKey: false })
}

router.get('/', async (req, res) => {
  const users = await paginate(User.find({}), req)
  res.send(users.map(serializer))
})

router.post('/', async (req, res) => {
  const user = await new User(req.body.user).save()
  res.send(serializer(user))

})


// Api cho nguoi dung
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.send(user);
      }
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});


router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router