import { jest, expect, describe, test } from "@jest/globals";
import app from "../server";
import request from "supertest";
import morgan from "morgan";

describe("Testing the server", () => {
//probando el inicio del servidor
  test("Server starts successfully", async () => {
    const server = await app.listen(3000);
    expect(server).toBeDefined();
    server.close();
  });
// probando la respuesta de la ruta
  test("GET / responds with 200 status code", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
//verificando uso del modulo morgan
  test("Morgan middleware is being used", async () => {
    const morganSpy = jest.fn();
    app.use(morgan("dev"));
    await request(app).get("/");
    expect(morganSpy.mock.calls.length > 0).toBe(false);
  });
});
