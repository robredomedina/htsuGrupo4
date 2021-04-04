const request = require("supertest");
const { setupMongo } = require("./test.setup");
const { app } = require("../src/server");
const { expect, test } = require("@jest/globals");
const hotspots = require('../src/Utils/hotspots');

test("Given a set of coordinates and a pha that are within the same square, should return 1", 
    async () => {

    const coordinates = {
        lat: 0,
        long: 160,
    };

    const pha = {
        "full_name": "test",
        "a":1.078076432,
        "e": 0.827072914,
        "i": 22.81881892,
        "om": 87.98911327,
        "w": 31.40697081,
        "ma": 8.160598893 
    }

    await request(app).post('/api/phas/add').send(pha);

    const answer = await hotspots(coordinates.lat, coordinates.long);

    expect(answer).toBe(1);

});

test("Given a set of coordinates and a pha that are not within the same square because of longitude, should return 0", 
    async () => {

    const coordinates = {
        lat: 0,
        long: 179,
    };

    const pha = {
        "full_name": "test",
        "a":1.078076432,
        "e": 0.827072914,
        "i": 22.81881892,
        "om": 87.98911327,
        "w": 31.40697081,
        "ma": 8.160598893 
    }

    await request(app).post('/api/phas/add').send(pha);

    const answer = await hotspots(coordinates.lat, coordinates.long);

    expect(answer).toBe(0);

});

test("Given a set of coordinates and a pha that are not within the same square because of latitude, should return 0", 
    async () => {

    const coordinates = {
        lat: 15,
        long: 160,
    };

    const pha = {
        "full_name": "test",
        "a":1.078076432,
        "e": 0.827072914,
        "i": 22.81881892,
        "om": 87.98911327,
        "w": 31.40697081,
        "ma": 8.160598893 
    }

    await request(app).post('/api/phas/add').send(pha);

    const answer = await hotspots(coordinates.lat, coordinates.long);

    expect(answer).toBe(0);

});