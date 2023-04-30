import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
	res.json({
		name: 'juan',
	})
})

router.post('/', (req, res) => {
	const body = req.body
	res.json({
		message: 'created',
		data: body,
	})
})

export default router
