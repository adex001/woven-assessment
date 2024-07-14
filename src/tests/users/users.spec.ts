import { expect } from "chai";
import request from "supertest";
import app from "../../main";
import path from "path";
import User from "../../database/models/User";

const badEmail = "abc@gmail";
const goodEmail1 = "abc@gmail.com";
const updatedEmail = "adex0011@gmail.com";
const username1 = "adex001";

const invalidprofileToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjkzYmE1Mjk0NTQ0Zjg1MTEyNzkyOTkiLCJpYXQiOjE3MjA5NTc1MjJ9.P7F69zodfSSAf1mtHYjHj8ObHnOwXEvRsiMDTymYejQ";
const userRoute = "/api/users";

let token: string | null = null;

describe("Register User API Tests", function () {
  before(async function () {
    await User.deleteMany({});
  });

  describe("Invalid registration parameters", () => {
    it(`Should return "email" must be a valid email`, (done) => {
      request(app)
        .post(userRoute + "/register")
        .send({
          email: badEmail,
          username: "adzz",
          password: "password",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({
            error: '"email" must be a valid email',
          });
          done();
        });
    });

    it(`Should return "username" must be a valid email`, (done) => {
      request(app)
        .post(userRoute + "/register")
        .send({
          email: goodEmail1,
          username: "ad",
          password: "password",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(422);
          expect(res.body).to.deep.equal({
            error: '"username" length must be at least 3 characters long',
          });
          done();
        });
    });

    it(`Should register a new user`, (done) => {
      request(app)
        .post(userRoute + "/register")
        .send({
          email: goodEmail1,
          username: username1,
          password: "password",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal("User registered successfully");
          expect(res.body.data).to.exist;
          expect(res.body.data.email).to.equal(goodEmail1);
          expect(res.body.data.id).to.exist;
          done();
        });
    });

    it(`Should return 'Username or email exists! Try another'`, (done) => {
      request(app)
        .post(userRoute + "/register")
        .send({
          email: goodEmail1,
          username: username1,
          password: "password",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(
            "Username or email exists! Try another"
          );
          expect(res.body.data).to.not.exist;
          done();
        });
    });
  });
});

describe("Login User API Tests", function () {
  describe("login parameters", () => {
    it(`Should return invalid credentials when password or email is wrong`, (done) => {
      request(app)
        .post(userRoute + "/login")
        .send({
          username: username1,
          password: "wrongpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          expect(res.body.data).to.not.exist;
          expect(res.body.error).to.equal("Invalid credentials");
          done();
        });
    });
  });

  it(`Should login a user`, (done) => {
    request(app)
      .post(userRoute + "/login")
      .send({
        username: username1,
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Login successful");
        expect(res.body.data).to.exist;
        expect(res.body.data.email).to.exist;
        expect(res.body.data.token).to.exist;
        expect(res.body.data.id).to.exist;

        token = res.body.data.token;
        done();
      });
  });
});

describe("Get User Profile API Tests", function () {
  describe("User Profile", () => {
    it(`Should return No token provided`, (done) => {
      request(app)
        .get(userRoute + "/profile")
        .send({
          username: username1,
          password: "password",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          expect(res.body).to.deep.equal({
            error: "No token provided",
          });
          done();
        });
    });

    it(`Should return Token is not valid`, (done) => {
      request(app)
        .get(userRoute + "/profile")
        .set("Authorization", "Bearer badtoken")
        .send({
          username: username1,
          password: "password",
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(401);
          expect(res.body).to.deep.equal({
            error: "Token is not valid",
          });
          done();
        });
    });

    it(`Should get the user profile`, (done) => {
      request(app)
        .get(userRoute + "/profile")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal("User Profile Retrieved.");
          expect(res.body.data).to.exist;
          expect(res.body.data.email).to.exist;
          expect(res.body.data).to.exist;
          done();
        });
    });
    it(`Should not find the user profile`, (done) => {
      request(app)
        .get(userRoute + "/profile")
        .set("Authorization", `Bearer ${invalidprofileToken}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal("Profile not found");
          expect(res.body.data).to.not.exist;
          done();
        });
    });
  });
});

describe("Update User Profile API Tests", function () {
  it(`Should return No token provided`, (done) => {
    request(app)
      .get(userRoute + "/profile")
      .send({
        username: username1,
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({
          error: "No token provided",
        });
        done();
      });
  });

  it(`Should return Token is not valid`, (done) => {
    request(app)
      .get(userRoute + "/profile")
      .set("Authorization", "Bearer badtoken")
      .send({
        username: username1,
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        expect(res.body).to.deep.equal({
          error: "Token is not valid",
        });
        done();
      });
  });

  it(`Should update the user profile`, (done) => {
    request(app)
      .put(userRoute + "/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: updatedEmail,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Profile updated successfully.");
        expect(res.body.data).to.exist;
        expect(res.body.data.email).to.equal(updatedEmail);
        done();
      });
  });
  it(`Should not find the user profile`, (done) => {
    request(app)
      .put(userRoute + "/profile")
      .set("Authorization", `Bearer ${invalidprofileToken}`)
      .send({
        email: updatedEmail,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Profile not found");
        expect(res.body.data).to.not.exist;
        done();
      });
  });
  it(`Should not update an existing email`, (done) => {
    request(app)
      .put(userRoute + "/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: updatedEmail,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal("Email exists. please try another");
        expect(res.body.data).to.not.exist;
        done();
      });
  });

  it(`Should not update an existing username`, (done) => {
    request(app)
      .put(userRoute + "/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: username1,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          "Username exists. please try another"
        );
        expect(res.body.data).to.not.exist;
        done();
      });
  });
});

describe("Update User Profile Picture API Tests", function () {
  it(`Should not find the user profile`, (done) => {
    request(app)
      .post(userRoute + "/profile/picture")
      .set("Authorization", `Bearer ${invalidprofileToken}`)
      .attach("file", path.resolve(__dirname, "../../../uploads", "cloud.jpeg"))
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Profile not found");
        expect(res.body.data).to.not.exist;
        done();
      });
  });
  it(`Should not upload a file that is not jpg, jpeg, or png.`, (done) => {
    request(app)
      .post(userRoute + "/profile/picture")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", path.resolve(__dirname, "../../../uploads", "index.txt"))
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(500);
        expect(res.body).to.deep.equal({
          message: "Please upload an image file (jpg, jpeg, or png)",
        });
        done();
      });
  });

  it(`Should upload the file that is jpg, jpeg, or png.`, (done) => {
    request(app)
      .post(userRoute + "/profile/picture")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", path.resolve(__dirname, "../../../uploads", "cloud.jpeg"))
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          "Profile picture uploaded successfully."
        );
        done();
      });
  });
  it(`Should return No file uploaded.`, (done) => {
    request(app)
      .post(userRoute + "/profile/picture")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal("No file uploaded");
        done();
      });
  });
});

describe("Get User Profile Picture API Tests", function () {
  after(async function () {
    await User.deleteMany({});
  });
  it(`Should get the profile picture`, (done) => {
    request(app)
      .get(userRoute + "/profile/picture")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it(`Should register a new user`, (done) => {
    request(app)
      .post(userRoute + "/register")
      .send({
        email: "newemail@gmail.com",
        username: "newusername",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("User registered successfully");
        expect(res.body.data).to.exist;
        expect(res.body.data.email).to.equal("newemail@gmail.com");
        expect(res.body.data.id).to.exist;
        done();
      });
  });

  it(`Should login a user`, (done) => {
    request(app)
      .post(userRoute + "/login")
      .send({
        username: "newusername",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Login successful");
        expect(res.body.data).to.exist;
        expect(res.body.data.email).to.exist;
        expect(res.body.data.token).to.exist;
        expect(res.body.data.id).to.exist;

        token = res.body.data.token;
        done();
      });
  });

  it(`Should not get the profile picture since no profile picture`, (done) => {
    request(app)
      .get(userRoute + "/profile/picture")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal("Profile picture not found");
        done();
      });
  });
});
