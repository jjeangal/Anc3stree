import {  
    Menu,
    MenuGroup,
    MenuItem,
    MenuDivider,
    MenuButton,
    MenuList,
    Button,
    Text,
    Box
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';

const stripAddress = function (address) {
    const beginning = address.slice(0, 6);
    const end = address.slice(address.length - 4);
    return `${beginning}...${end}`;
};

export default function DisconnectMenu({ deactivate, account }) {
    return (
        <Menu>
            <MenuButton as={Button} variant={'outline'} borderWidth={3} p={6} rightIcon={<HamburgerIcon />}>{ stripAddress(account) }</MenuButton>
            <MenuList>
                <Text pl={3}>{ stripAddress(account) }</Text>
                <MenuDivider />
                <Box>
                    <Text pl={4}>Network</Text>
                    <Text pl={3}>Ethereum</Text>
                </Box>
                <MenuDivider/>
                <MenuGroup title='Wallet'>
                    <MenuItem onClick={() => { navigator.clipboard.writeText(account) }}>Copy Address</MenuItem>
                    <MenuItem onClick={() => { deactivate() }}>Disconnect</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}