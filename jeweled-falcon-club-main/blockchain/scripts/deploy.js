const baseTokenURI = "ipfs://QmYFFfEPPN5BHDyxUhHCTV9UciDG4J9pELs232DLdeYZ7T/";
const contractURI = "ipfs://QmYbtoU2YGuPvNGCtbLq8khEgnNBPeLZ7rBtPG5XP5x6r4";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Deploying contract...");

  const Contract = await ethers.getContractFactory("JeweledFalconClub");
  const contract = await Contract.deploy(baseTokenURI, contractURI);

  console.log("Contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
