const { objectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
    getUsers(req, res) {
        User.findOne()
        .then(async (users) => {
            const userObj = {
                users,
            };
            return res.json(studentObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    getSingleUser(req, req) {
        User.findOne({_id: req.params.userId })
        .select('-__v')
        .then(async (user) => 
        !user
        ? res.status(404).json({ message: 'No student with that ID' })
        : res.json({
            user
        })
    ).catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
//create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) =>  res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    //delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
       .then((user) => 
       !user 
       ? res.status(404).json({ message: 'No user with that ID' })
       : Thought.findOneAndRemove(
        { _id: req.params.userId },
        {$pull: { user:req.params.userId } },
       )
       )
       .then((thought) => 
       !thought
        ? res.status(404).json({
            message: 'User deleted, but no thoughts were found',
        })
        : res.json({ message: 'User successfully deleted' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },


    
}