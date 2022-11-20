task("create-factory", "Creates a custom nft collection")
    .setAction(async(taskArgs) => {
        const contractAddr = taskArgs.contract
        const NFTFactory = await ethers.getContractFactory("NFTFactory")
    
        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]
    
        const customContract = new ethers.Contract(contractAddr, NFTFactory.interface, signer)

    })

    module.exports = {}

