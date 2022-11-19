
import { Link, BrowserRouter } from "react-router-dom";

import { 
    Flex,
    Spacer,
    HStack,
    Text
} from '@chakra-ui/react'

import { useWeb3React } from '@web3-react/core';

const siteTitle="Anc3stree";

function Header() {
  return (
    <Flex backgroundColor='#DCD7C9' h={120} p={9}>
        <HStack spacing='100px'>
            <BrowserRouter>
                <Link to='/'>
                    <Text fontSize="2xl" fontWeight="bold">{siteTitle}</Text>
                </Link>
            </BrowserRouter>
        </HStack>
        <Spacer/>
    </Flex>
  );
}

export default Header;