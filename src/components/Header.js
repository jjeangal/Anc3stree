
import { NavLink, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import DisconnectMenu from "./DisconnectMenu";
import SelectWalletModal from "./WalletModal";

import { 
    Flex,
    Spacer,
    HStack,
    Text,
    useDisclosure,
    Button
} from '@chakra-ui/react'

import { useWeb3React } from '@web3-react/core';
import { connectors } from "../services/connectors";

const siteTitle="Anc3stree";

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { 
        account,
        activate,
        deactivate,
        active
    } = useWeb3React();

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        console.log(provider);
        if (provider) activate(connectors[provider]);
    }, [activate]);

  return (
    <Flex backgroundColor='#DCD7C9' h={120} p={9}>
        <HStack spacing='100px'>
            <NavLink to='/'>
                <Text fontSize="2xl" fontWeight="bold">{siteTitle}</Text>
            </NavLink>
            <NavLink to='/about'>
                <Text fontSize="xl">About the community</Text>
            </NavLink>

        </HStack>
        <Spacer/>
        <HStack spacing='100px'>
            <NavLink to='/tree'>
                <Text fontSize="xl">Family Tree</Text>
            </NavLink>
            {!active ? (
                        <Button 
                            onClick={onOpen} 
                            borderWidth={3}
                            h={'60px'} 
                            w={'170px'}
                            variant={'outline'}
                            >Connect Wallet</Button>
                    ) : (
                        <div>
                            <DisconnectMenu deactivate={deactivate} account={account}/>
                        </div>
                    )
                }
        </HStack>
        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </Flex>
  );
}