import request from "supertest";
import app from "../main";
import { expect } from "chai";

describe("Display the Home message", () => {
  it('should display "Welcome to User Management API." ', (done) => {
    request(app)
      .get( "/")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Welcome to User Management API.");
        done();
      });
  });
});

describe("Display an Invalid URL", () => {
  it('should display "Invalid url.." ', (done) => {
    request(app)
      .get("/invalid")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Invalid url.");
        done();
      });
  });
});
