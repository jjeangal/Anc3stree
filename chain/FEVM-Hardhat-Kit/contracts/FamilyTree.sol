// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {ArrayUtils} from "./lib/ArrayUtils.sol";

contract FamilyTree {

    using ArrayUtils for uint256[];

    struct Human {
        string fullName;
        string birthDate;
        string birthPlace;
        string deathDate;
        string deathPlace;
        uint256 fatherId;
        uint256 motherId;
    }

    struct Tree {
        uint256[] familyMembersIds;
    }

    mapping(uint256 => Human) public humans;

    mapping(uint256 => Tree) private trees;

    mapping(address => uint256) private treeManagers;

    mapping(address => uint256) private humanManagers;

    constructor() {}

    function createHuman(
        string calldata fullName,
        string calldata birthDate,
        string calldata birthPlace,
        string calldata deathDate,
        string calldata deathPlace,
        uint256 leftParentId,
        uint256 rightParentId
    ) external returns (uint256) {
        uint256 id = uint256(keccak256(abi.encodePacked(fullName, birthDate)));
        humans[id] = Human(
            fullName,
            birthDate,
            birthPlace,
            deathDate,
            deathPlace,
            leftParentId,
            rightParentId
        );
        humanManagers[msg.sender] = id;
        return id;
    }

    function addParentsToHuman(uint256 id, uint256 leftParentId, uint256 rightParentId) external {
        require(humanManagers[msg.sender] == id, "You are not the manager of this human");
        Human storage human = humans[id];
        human.fatherId = leftParentId;
        human.motherId = rightParentId;
    }

    function getHuman(uint256 humanId) external view returns (Human memory) {
        return humans[humanId];
    }

    function createTree(uint256 id) external returns (uint256) {
        uint256[] memory familyMembersIds = new uint256[](0);
        familyMembersIds[0] = id;
        uint256 treeId = uint256(keccak256(abi.encodePacked(familyMembersIds)));
        Tree memory tree = Tree(familyMembersIds);
        trees[treeId] = tree;
        treeManagers[msg.sender] = treeId;
        return treeId;
    }

    function addMemberToFamilyTree(uint256 memberId, uint256 treeId) external {
        require(treeManagers[msg.sender] == treeId, "You are not the manager of this tree");
        Tree storage tree = trees[treeId];
        tree.familyMembersIds.push(memberId);
    }

    function printFamily(uint256 familyId) external view returns (Human[] memory) {
        // TODO
    }
}
