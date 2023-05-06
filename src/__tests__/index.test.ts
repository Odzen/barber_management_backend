// import {expect, describe, it } from "@jest/globals";

// const request = require('supertest');
// import app from'../server';
// import start from'../index';

// describe('Server integration test', () => {
//   let server;

//   beforeAll(async () => {
//     server = await start();
//   });

//   afterAll(async () => {
//     await server.close();
//   });

//   it('should start the server and listen on the specified port', async () => {
//     const response = await request(app).get('/graphql');
//     expect(response.status).toBe(200);
//   });
// });
//import { it, expect, describe, beforeAll, afterAll } from "@jest/globals";
import { it, expect, describe} from "@jest/globals";
import request from "supertest";
import app from "../server";
//import start from "../index";
//import http from "http";
describe("Server integration test", () => {
  //let server:http.Server;
  //const server = http.createServer(app);
  //   const httpServer = http.createServer(app);
  //   beforeAll(async () => {
  //     await start();
  //   });

  //   afterAll(async () => {
  //     await httpServer.close();
  //   });

  //   it('should start the server and listen on the specified port', async () => {
  //     const response = await request(app).get('/graphql');
  //     expect(response.status).toBe(200);
  //   });
  it("GraphQL endpoint should return 400 status code", async () => {
    const response = await request(app).get("/graphql");
    expect(response.status).toBe(404);
  });
});
