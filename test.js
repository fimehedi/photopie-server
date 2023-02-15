const describe = require('describe');
const request = require('supertest');
const app = require('./index');

describe('Test the root path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).get('/');
		expect(response.statusCode).toBe(200);
	});

	test('It should return an OK status and a 200 code', async () => {
		const response = await request(app).get('/');
		expect(response.body).toEqual({ status: 'OK', code: 200 });
	});
});

describe('Test the /services path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).get('/services');
		expect(response.statusCode).toBe(200);
	});

	test('It should return an array of service objects', async () => {
		const response = await request(app).get('/services');
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body[0]).toHaveProperty('_id');
		expect(response.body[0]).toHaveProperty('name');
		expect(response.body[0]).toHaveProperty('description');
	});
});

describe('Test the /service/:id path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).get('/service/12345');
		expect(response.statusCode).toBe(200);
	});

	test('It should return a service object with the specified ID', async () => {
		const response = await request(app).get('/service/12345');
		expect(response.body).toHaveProperty('_id', '12345');
		expect(response.body).toHaveProperty('name');
		expect(response.body).toHaveProperty('description');
	});
});

describe('Test the /add-service path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).post('/add-service').send({});
		expect(response.statusCode).toBe(200);
	});

	test('It should return an isAdded property set to true', async () => {
		const response = await request(app).post('/add-service').send({});
		expect(response.body).toHaveProperty('isAdded', true);
	});
});

describe('Test the /delete-service/:id path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).delete('/delete-service/12345');
		expect(response.statusCode).toBe(200);
	});

	test('It should return an isDeleted property set to true', async () => {
		const response = await request(app).delete('/delete-service/12345');
		expect(response.body).toHaveProperty('isDeleted', true);
	});
});

describe('Test the /reviews path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).get('/reviews');
		expect(response.statusCode).toBe(200);
	});

	test('It should return an array of review objects', async () => {
		const response = await request(app).get('/reviews');
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body[0]).toHaveProperty('_id');
		expect(response.body[0]).toHaveProperty('name');
		expect(response.body[0]).toHaveProperty('review');
	});
});

describe('Test the /add-review path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).post('/add-review').send({});
		expect(response.statusCode).toBe(200);
	});

	test('It should return an isAdded property set to true', async () => {
		const response = await request(app).post('/add-review').send({});
		expect(response.body).toHaveProperty('isAdded', true);
	});
});

describe('Test the /delete-review/:id path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).delete('/delete-review/12345');
		expect(response.statusCode).toBe(200);
	});

	test('It should return an isDeleted property set to true', async () => {
		const response = await request(app).delete('/delete-review/12345');
		expect(response.body).toHaveProperty('isDeleted', true);
	});
});

describe('Test the /all-admins path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).get('/all-admins');
		expect(response.statusCode).toBe(200);
	});

	test('It should return an array of admin objects', async () => {
		const response = await request(app).get('/all-admins');
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body[0]).toHaveProperty('_id');
		expect(response.body[0]).toHaveProperty('email');
	});
});

describe('Test the /make-admin path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).post('/make-admin').send({});
		expect(response.statusCode).toBe(200);
	});

	test('It should return an isAdded property set to true if the admin does not already exist', async () => {
		const response = await request(app).post('/make-admin').send({});
		expect(response.body).toHaveProperty('isAdded', true);
	});

	test('It should return an isAdmin property set to true if the admin already exists', async () => {
		const response = await request(app).post('/make-admin').send({});
		expect(response.body).toHaveProperty('isAdmin', true);
	});
});

describe('Test the /is-admin path', () => {
	test('It should respond with a 200 status code', async () => {
		const response = await request(app).post('/is-admin').send({});
		expect(response.statusCode).toBe(200);
	});

	test('It should return an isAdmin property set to true if the email is found in the admins collection', async () => {
		const response = await request(app)
			.post('/is-admin')
			.send({ email: 'admin@example.com' });
		expect(response.body).toHaveProperty('isAdmin', true);
	});

	test('It should return an isAdmin property set to false if the email is not found in the admins collection', async () => {
		const response = await request(app)
			.post('/is-admin')
			.send({ email: 'user@example.com' });
		expect(response.body).toHaveProperty('isAdmin', false);
	});
});
