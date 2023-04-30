function errorHandler(schema, property) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	})
}

export default errorHandler
