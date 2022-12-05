task("create-human", "Calls the Family Tree Contract to create a Human.")
  .addParam("contract", "The address the Family Tree contract")
  .addParam("account", "The address of the deployer")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const FamilyTree = await ethers.getContractFactory("FamilyTree")

    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]


    const treeContract = new ethers.Contract(contractAddr, FamilyTree.interface, signer)
    let result = BigInt(await treeContract.createHuman("Rodrigo Gaona", "02/12/1999", "Talca", "N/A", "N/A", 0, 0)).toString()
    console.log("Data is: ", result)
  })

module.exports = {}