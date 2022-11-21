const { expect } = require("chai");

const baseTokenURI = "";
const contractURI = "";
const merkleRoot = "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("Token contract", async function () {
  it("Premint 50 tokens to owner", async function () {
    const [owner] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("JeweledFalconClub");
    const contract = await Contract.deploy(baseTokenURI, contractURI, merkleRoot);

    const ownerBalance = await contract.balanceOf(owner.address);

    expect(await contract.totalSupply()).to.equal(ownerBalance);
  });
});