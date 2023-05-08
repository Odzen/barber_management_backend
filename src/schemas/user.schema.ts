// DTO of User -- Data Transfer User

import Joi from 'joi'

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(60)
const documentNumber = Joi.string().min(3).max(30)
const phone = Joi.string().min(3).max(30)
const birthDate = Joi.date().iso()
const urlImg = Joi.string().base64()
const email = Joi.string().email()
const role = Joi.string().valid('ADMIN', 'BARBER', 'CUSTOMER')
const state = Joi.string().valid('ACTIVE', 'INACTIVE')
const password = Joi.string().min(6).max(30)

const createUserSchema = Joi.object({
	name: name.required(),
	documentNumber: documentNumber.required(),
	email: email.required(),
	phone: phone.required(),
	birthDate: birthDate.required(),
	urlImg: urlImg.required(),
	state: state,
	role: role,
	password: password.required(),
})

const updateUserSchema = Joi.object({
	name: name,
	documentNumber: documentNumber,
	email: email,
	phone: phone,
	birthDate: birthDate,
	urlImg: urlImg,
	state: state,
	role: role,
	password: password,
})

const getUserSchema = Joi.object({
	id: id.required(),
})

const skip = Joi.number().integer()
const take = Joi.number().integer()
const orderBy = Joi.string().valid('createdAt', 'birthDate')

const queryUserSchema = Joi.object({
	skip,
	take,
	orderBy,
})

export { createUserSchema, updateUserSchema, getUserSchema, queryUserSchema }
