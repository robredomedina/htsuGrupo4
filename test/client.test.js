const request = require('supertest');
const { setupMongo }  = require('./test.setup');
const { app } = require('../src/server');
const { expect } = require('@jest/globals');

setupMongo('ClientTest');

test("Create client should work", async () =>{
    const newClient = {
        Name: "test",
        Lastname: "test",
        Age: 29,
        Latitude: 180,
        Longitude: 54
    };

    const createRes = await request(app)
        .post('/api/clients/')
        .send(newClient);

    expect(createRes.status).toBe(201);

});