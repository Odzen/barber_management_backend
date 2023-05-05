import { jest, expect, describe, test } from "@jest/globals";
import app from "../server";
import request from "supertest";
import morgan from "morgan";

describe("Testing the server", () => {
  test("Server starts successfully", async () => {
    const server = await app.listen(3000);
    expect(server).toBeDefined();
    server.close();
  });

  test("GET / responds with 200 status code", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

 
});
