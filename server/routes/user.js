const router = require("express").Router();
const bcrypt = require("bcrypt");
const { json } = require("express");
const User = require("../models/User");
//update user
router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.user?.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json("Аккаунт успешно обновлен...");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("Вы не можете редактировать чужой аккаунт")
    }
});
//delete user
router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.user?.isAdmin) {

        try {
            const user = await User.findByIdAndRemove(req.params.id);
            return res.status(200).json("Аккаунт успешно удален...");
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("Вы не можете удалить чужой аккаунт")
    }
});
// get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username })
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});
//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                return res.status(200).json("user has been followed");
            } else {
                return res.status(403).json("you allready follow this user");
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can not follow youself")
    }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return res.status(200).json("user has been unfollowed");
            } else {
                return res.status(403).json("you allready unfollow this user");
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can not unfollow youself")
    }
});

//get friends
router.get("/friends/:userId", async (req, res)=>{
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId=>{
                return User.findById(friendId);
            })
        );
        let friendList = [];
         friends.map(friend=>{
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture});
        });
        return res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json(error);
    }
})


module.exports = router;