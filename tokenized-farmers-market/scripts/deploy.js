async function main() {
  const FarmersMarket = await ethers.getContractFactory("FarmersMarket");
  const cUSDTokenAddress = "CELO_CUSD_TOKEN_ADDRESS";
  const farmersMarket = await FarmersMarket.deploy(cUSDTokenAddress);

  await farmersMarket.deployed();

  console.log("FarmersMarket contract deployed to:", farmersMarket.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});