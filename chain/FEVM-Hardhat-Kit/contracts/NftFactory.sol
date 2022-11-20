// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

import "./CustomNft.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title Factory ERC721 Contract 
/// @author Anc3stree
contract NFTFactory is ReentrancyGuard, Ownable {

  event CollectionCreated(address _collectionAddress, address _owner);
  event NFTMinted(address _collectionAddress, uint256 _tokenId);

  /// Maps the collection addresses to the collection contracts
  mapping(address => Anc3streeToken) public collections;
  /// Maps the collection addresses to the contract owner addresses 
  mapping(address => address) public ownerToCollection;
 
  /// Create a new collection
  function createCollection(
    string calldata _name, 
    string calldata _symbol, 
    string calldata _tokenUri,
    uint256 _maxSupply
  ) external returns (address) {
    Anc3streeToken newCollection = new Anc3streeToken( _name, _symbol, _tokenUri, _maxSupply);

    address collectionAddress = address(newCollection);

    collections[collectionAddress] = newCollection;
    ownerToCollection[msg.sender] = collectionAddress;

    emit CollectionCreated(collectionAddress, msg.sender);
    return collectionAddress;
  }

  /// Mint a token from a chosen collection
  function mintFromCollection(address _collectionAddress, address familyMember) external payable onlyOwner nonReentrant returns (uint256) {
    uint256 tokenId = collections[_collectionAddress].mint(familyMember);
    emit NFTMinted(_collectionAddress, tokenId);
    return(tokenId);
  }

  // Returns the collections of an owner
  function getCollectionOfOwner(address _ownerAddress) external view returns(address) {
    return(ownerToCollection[_ownerAddress]);
  }

  /// Returns the name of a collection
  function getCollectionName(address _collectionAddress) external view returns(string memory) {
    return(collections[_collectionAddress].name());
  }

  /// Returns the cid of the collection
  function getCollectionName(address _collectionAddress) external view returns(string memory) {
    return(collections[_collectionAddress].cid());
  }

  /// Returns the symbol of a collection
  function getCollectionSymbol(address _collectionAddress) external view returns(string memory) {
    return(collections[_collectionAddress].symbol());
  }

  /// Returns the base uri of a collection
  function getCollectionBaseUri(address _collectionAddress) external view returns(string memory) {
    return(collections[_collectionAddress].baseTokenURI());
  }

  /// Returns the max supply of tokens that a collection allows
  function getCollectionMaxSupply(address _collectionAddress) external view returns(uint256) {
    return(collections[_collectionAddress].maxSupply());
  }

  /// Returns the uri of a token
  function getTokenUri(address _collectionAddress, uint256 _tokenId) external view returns(string memory) {
    return(collections[_collectionAddress].tokenURI(_tokenId));
  }

  /// Returns the owner of a collection
  function getCollectionOwner(address _collectionAddress) public view returns(address) {
    return(collections[_collectionAddress].owner());
  }
}