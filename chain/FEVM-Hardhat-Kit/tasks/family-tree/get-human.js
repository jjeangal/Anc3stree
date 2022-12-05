task("get-human", "Calls FamilyTree Contract to read the human by id.")
  .setAction(async (taskArgs) => {
    const contractAddr = '0x87424ff4d56d9857f34bfAF559bDbb9bdeCE9eC6'
    const humanId = '90353056370605145836275938234293016372970833110308715295529726767171632198856'
    const FamilyTree = await ethers.getContractFactory("FamilyTree")

    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]


    const treeContract = new ethers.Contract(contractAddr, FamilyTree.interface, signer)
    let result = await treeContract.getHuman(humanId)
    console.log("Human is: ", result)
  })

module.exports = {}