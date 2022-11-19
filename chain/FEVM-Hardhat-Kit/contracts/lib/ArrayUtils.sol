// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.13;

library ArrayUtils {
    function indexOf(address[] memory _array, address a) internal pure returns (uint256, bool) {
        uint256 length = _array.length;
        for (uint256 i = 0; i < length; i++) {
            if (_array[i] == a) {
                return (i, true);
            }
        }
        return (0, false);
    }

    function contains(address[] memory _array, address a) internal pure returns (bool) {
        (, bool isIn) = indexOf(_array, a);
        return isIn;
    }

    function hasDuplicate(address[] memory _array) internal pure returns (bool) {
        require(_array.length > 0, "_array is empty");

        for (uint256 i = 0; i < _array.length - 1; i++) {
            address current = _array[i];
            for (uint256 j = i + 1; j < _array.length; j++) {
                if (current == _array[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function remove(address[] memory _array, address a) internal pure returns (address[] memory) {
        (uint256 index, bool isIn) = indexOf(_array, a);
        if (!isIn) {
            revert("Address not in array.");
        } else {
            (address[] memory _newArray,) = pop(_array, index);
            return _newArray;
        }
    }

    /**
     * @param _array The input array to search
     * @param a The address to remove
     */
    function removeStorage(address[] storage _array, address a) internal {
        (uint256 index, bool isIn) = indexOf(_array, a);
        if (!isIn) {
            revert("Address not in array.");
        } else {
            uint256 lastIndex = _array.length - 1; // If the array would be empty, the previous line would throw, so no underflow here
            if (index != lastIndex) _array[index] = _array[lastIndex];
            _array.pop();
        }
    }

    /**
     * Removes specified index from array
     * @param _array The input array to search
     * @param index The index to remove
     * @return Returns the new array and the removed entry
     */
    function pop(address[] memory _array, uint256 index)
        internal
        pure
        returns (address[] memory, address)
    {
        uint256 length = _array.length;
        require(index < _array.length, "Index must be < _array length");
        address[] memory newAddresses = new address[](length - 1);
        for (uint256 i = 0; i < index; i++) {
            newAddresses[i] = _array[i];
        }
        for (uint256 j = index + 1; j < length; j++) {
            newAddresses[j - 1] = _array[j];
        }
        return (newAddresses, _array[index]);
    }

    /**
     * Returns the combination of the two arrays
     * @param _array The first array
     * @param _anotherArray The second array
     * @return Returns _array extended by _anotherArray
     */
    function extend(address[] memory _array, address[] memory _anotherArray)
        internal
        pure
        returns (address[] memory)
    {
        uint256 aLength = _array.length;
        uint256 bLength = _anotherArray.length;
        address[] memory newAddresses = new address[](aLength + bLength);
        for (uint256 i = 0; i < aLength; i++) {
            newAddresses[i] = _array[i];
        }
        for (uint256 j = 0; j < bLength; j++) {
            newAddresses[aLength + j] = _anotherArray[j];
        }
        return newAddresses;
    }
}