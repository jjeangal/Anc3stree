const stripAddress = function (address) {
    const beginning = address.slice(0, 6);
    const end = address.slice(address.length - 4);
    return `${beginning}...${end}`;
};

export { stripAddress };