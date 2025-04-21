'use client';

import {useRouter} from 'next/navigation';
import {
    Box, Button, Container, Flex, HStack, IconButton, Image, Menu, MenuButton,
    MenuItem, MenuList, Text, useDisclosure
} from '@chakra-ui/react';
import {FaBars, FaBell, FaClipboardList, FaCog, FaComments, FaSignOutAlt, FaUserCircle} from 'react-icons/fa';
import Link from 'next/link';
import {useAuth} from '@/contexts/AuthContext';
import CustomAvatar from "@/components/common/CustomAvatar";

const Header = () => {
    const {isAuthenticated, user, logout} = useAuth();
    const router = useRouter();
    const {onOpen} = useDisclosure();

    const handleLoginClick = () => {
        router.push('/login');
    };

    const handleSignupClick = () => {
        router.push('/signup');
    };

    const handleMyPageClick = () => {
        router.push('/mypage');
    };

    // 이미지 오류 처리 함수
    const handleImageError = () => {
        console.log('프로필 이미지 로드 실패');
    };

    return (
        <Box as="header" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
            <Container maxW="container.xl">
                <Flex py={4} justify="space-between" align="center">
                    {/* 로고 */}
                    <Link href="/" passHref>
                        <Box cursor="pointer">
                            <Flex align="center">
                                <Image
                                    src="/logo.svg"
                                    alt="FreeWave Logo"
                                    h="40px"
                                    w="auto"
                                    fallbackSrc="./free_wave_logo.png"
                                />
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

                    {/* 로그인/회원가입 버튼 또는 사용자 메뉴 */}
                    <HStack spacing={4}>
                        {isAuthenticated ? (
                            <>
                                <IconButton
                                    aria-label="알림"
                                    icon={<FaBell/>}
                                    variant="ghost"
                                    colorScheme="blue"
                                />
                                <Menu>
                                    <MenuButton
                                        as={Flex}
                                        align="center"
                                        cursor="pointer"
                                        p={1}
                                        borderRadius="md"
                                        _hover={{bg: 'gray.100'}}
                                    >
                                        <HStack>
                                            <CustomAvatar
                                                size="sm"
                                                name={user?.nickname}
                                                src={user?.imageUrl}
                                                onError={handleImageError}
                                            />
                                            <Text display={{base: 'none', md: 'block'}}>{user?.nickname}</Text>
                                        </HStack>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem icon={<FaUserCircle/>} onClick={handleMyPageClick}>마이페이지</MenuItem>
                                        <MenuItem icon={<FaClipboardList/>}
                                                  onClick={() => router.push('/mypage?tab=1')}>내 프로젝트</MenuItem>
                                        <MenuItem icon={<FaComments/>}
                                                  onClick={() => router.push('/mypage?tab=2')}>메시지</MenuItem>
                                        <MenuItem icon={<FaCog/>}
                                                  onClick={() => router.push('/mypage?tab=4')}>설정</MenuItem>
                                        <MenuItem icon={<FaSignOutAlt/>} onClick={logout}>로그아웃</MenuItem>
                                    </MenuList>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" colorScheme="blue" onClick={handleLoginClick}>
                                    로그인
                                </Button>
                                <Button colorScheme="blue" onClick={handleSignupClick}>회원가입</Button>
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
