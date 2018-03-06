const banderoleServer = require('../../src/index');
const banderole = require('banderole');
const request = require('supertest');
const fetch = require('node-fetch');
const Net = require('net');
const Koa = require('koa');

const testData = require('./feature-flags.json');

beforeEach(() => {
    banderole.boot(testData);
});

describe('http server sanity check', () => {
    test('If I start the server and I get the ping route, the server respond PONG', async () => {
        //Given
        const port = 3000;

        //When
        const server = banderoleServer.http(banderole, new Koa(), port);
        const response = await request(server)
            .get('/ping');
        server.close();

        //Then
        expect(response.body).toEqual("PONG");
    });

    test('The server should always respond with a application/json content type', async () => {
        //Given
        const port = 3000;

        //When
        const server = banderoleServer.http(banderole, new Koa(), port);
        const response = await request(server)
            .get('/ping');
        server.close();

        //Then
        expect(response.headers["content-type"]).toEqual("application/json");
    });
});

describe('Return a feature-flag', () => {
    test('The server should respond true if the feature-flag is explicitely set to true', async () => {
        //Given
        const port = 3000;

        //When
        const server = banderoleServer.http(banderole, new Koa(), port);
        const response = await request(server)
            .get('/is-enabled/switchboard');
        server.close();

        //Then
        expect(response.body).toBeTruthy();
    });

    test('The server should respond false if the feature-flag is explicitely set to false', async () => {
        //Given
        const port = 3000;

        //When
        const server = banderoleServer.http(banderole, new Koa(), port);
        const response = await request(server)
            .get('/is-enabled/clock');
        server.close();

        //Then
        expect(response.text).toEqual("false");
    });
});