'use client';

import {useState} from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure
} from '@chakra-ui/react';
import {FaBars, FaBell, FaUser} from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Box as="header" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
            <Container maxW="container.xl">
                <Flex py={4} justify="space-between" align="center">
                    {/* 로고 */}
                    <Link href="/" passHref>
                        <Box cursor="pointer">
                            <Flex align="center">
                                <Image src="/logo.svg" alt="FreeWave Logo" h="40px"
                                       fallbackSrc="https://via.placeholder.com/150x50?text=FreeWave"/>
                            </Flex>
                        </Box>
                    </Link>

                    {/* 네비게이션 - 데스크톱 */}
                    <HStack spacing={8} display={{base: 'none', md: 'flex'}}>
                        <Link href="/projects" passHref>
                            <Box cursor="pointer" fontWeight="medium">프로젝트 찾기</Box>
                        </Link>
                        <Link href="/freelancers" passHref>
                            <Box cursor="pointer" fontWeight="medium">프리랜서 찾기</Box>
                        </Link>
                        <Link href="/how-it-works" passHref>
                            <Box cursor="pointer" fontWeight="medium">이용방법</Box>
                        </Link>
                    </HStack>

                    {/* 로그인/회원가입 버튼 */}
                    <HStack spacing={4}>
                        {isLoggedIn ? (
                            <>
                                <IconButton
                                    aria-label="알림"
                                    icon={<FaBell/>}
                                    variant="ghost"
                                    colorScheme="blue"
                                />
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        aria-label="사용자 메뉴"
                                        icon={<FaUser/>}
                                        variant="ghost"
                                        colorScheme="blue"
                                    />
                                    <MenuList>
                                        <MenuItem>프로필</MenuItem>
                                        <MenuItem>내 프로젝트</MenuItem>
                                        <MenuItem>메시지</MenuItem>
                                        <MenuItem>설정</MenuItem>
                                        <MenuItem onClick={() => setIsLoggedIn(false)}>로그아웃</MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" colorScheme="blue" onClick={() => setIsLoggedIn(true)}>
                                    로그인
                                </Button>
                                <Button colorScheme="blue">회원가입</Button>
                            </>
                        )}

                        {/* 모바일 메뉴 버튼 */}
                        <IconButton
                            display={{base: 'flex', md: 'none'}}
                            aria-label="메뉴 열기"
                            icon={<FaBars/>}
                            variant="ghost"
                            onClick={onOpen}
                        />
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
