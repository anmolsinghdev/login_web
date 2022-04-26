const userModel = require('../models/user')

exports.getUser = async (req, res) => {
    const data = await userModel.find({})
    return res.send(data)
}

exports.createUser = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const role = req.body.role;
        const phone = req.body.phone;
        const file = req.file;
        const filePath = '/uploads/' + file.filename;
        const data = await userModel.create({
            name: name,
            email: email,
            role: role,
            phone: phone,
            imagePath: filePath
        })
        return res.send({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(404).send({
            message: "server Not Working",
            error: err.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const role = req.body.role;
        const phone = req.body.phone;
        const file = req.file;
        const filePath = '/uploads/' + file.filename
        const data = await userModel.findByIdAndUpdate(id, {
            name: name,
            email: email,
            role: role,
            phone: phone,
            imagePath: filePath
        }, { new: true })
        return res.send({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(404).send({
            message: "server Not Working",
            error: err.message
        })
    }
}
exports.findUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findById(id)
        return res.send({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(404).send({
            message: "server Not Working",
            error: err.message
        })
    }
}
exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findByIdAndDelete(id)
        return res.send({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(404).send({
            message: "server Not Working",
            error: err.message
        })
    }
}