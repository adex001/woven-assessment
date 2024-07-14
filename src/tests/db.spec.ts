import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import connectToDatabase from "../database/connection";
import config from "../config";

describe("connectToDatabase", () => {
  let mongooseConnectStub: sinon.SinonStub;

  beforeEach(() => {
    mongooseConnectStub = sinon.stub(mongoose, "connect");
  });

  afterEach(() => {
    mongooseConnectStub.restore();
  });

  it("should connect to the development database", async () => {
    mongooseConnectStub.resolves();

    await connectToDatabase("development");

    expect(mongooseConnectStub.calledOnce).to.be.true;
    expect(mongooseConnectStub.calledWith(config.MONGO_URI)).to.be.true;
  });

  it("should connect to the test database", async () => {
    mongooseConnectStub.resolves();

    await connectToDatabase("test");

    expect(mongooseConnectStub.calledOnce).to.be.true;
    expect(mongooseConnectStub.calledWith(config.MONGO_URI_TEST)).to.be.true;
  });

  it("should connect to the production database", async () => {
    mongooseConnectStub.resolves();

    await connectToDatabase("production");

    expect(mongooseConnectStub.calledOnce).to.be.true;
    expect(mongooseConnectStub.calledWith(config.MONGO_URI)).to.be.true;
  });

  it("should throw an error if the mongoURI is not defined", async () => {
    try {
      await connectToDatabase("invalid" as "development");
      expect.fail("Expected error was not thrown");
    } catch (error) {
      expect((error as Error).message).to.equal(
        "MongoURI for invalid environment is not defined"
      );
    }
  });
});
