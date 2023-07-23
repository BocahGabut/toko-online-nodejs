import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    address: Joi.string().required()
});

export default userSchema;