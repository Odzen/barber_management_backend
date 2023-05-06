
import { it, expect, describe} from "@jest/globals";
import request from "supertest";
import app from "../server";


describe("Server integration test", () => {
 
  it("GraphQL endpoint should return 404 status code", async () => {
    const response = await request(app).get("/graphql");
    expect(response.status).toBe(404);
  });
});
