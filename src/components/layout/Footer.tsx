'use client';

import {Box, Button, Container, Heading, HStack, Icon, Input, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';

const Footer = () => {
    return (
        <Box bg="gray.800" color="white" py={10}>
            <Container maxW="container.xl">
                <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={8}>
                    {/* 회사 정보 */}
                    <Stack spacing={6}>
                        <Box>
                            <Heading as="h3" size="md" mb={2}>
                                FreeWave
                            </Heading>
                            <Text fontSize="sm" color="gray.400">
                                실시간 프리랜서 매칭 & 협업 플랫폼
                            </Text>
                        </Box>
                        <Text fontSize="sm">
                            © {new Date().getFullYear()} FreeWave. 모든 권리 보유.
                        </Text>
                        <HStack spacing={4}>
                            <Icon as={FaFacebook} boxSize={5} cursor="pointer"/>
                            <Icon as={FaTwitter} boxSize={5} cursor="pointer"/>
                            <Icon as={FaInstagram} boxSize={5} cursor="pointer"/>
                            <Icon as={FaLinkedin} boxSize={5} cursor="pointer"/>
                        </HStack>
                    </Stack>

                    {/* 서비스 */}
                    <Stack spacing={4}>
                        <Heading as="h3" size="sm">
                            서비스
                        </Heading>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            프로젝트 등록
                        </Box>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            프리랜서 찾기
                        </Box>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            프로젝트 찾기
                        </Box>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            결제 시스템
                        </Box>
                    </Stack>

                    {/* 회사 */}
                    <Stack spacing={4}>
                        <Heading as="h3" size="sm">
                            회사
                        </Heading>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            회사 소개
                        </Box>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            이용약관
                        </Box>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            개인정보처리방침
                        </Box>
                        <Box as="a" href="#" _hover={{color: 'blue.300'}}>
                            자주 묻는 질문
                        </Box>
                    </Stack>

                    {/* 뉴스레터 */}
                    <Stack spacing={4}>
                        <Heading as="h3" size="sm">
                            뉴스레터 구독
                        </Heading>
                        <Text fontSize="sm">
                            최신 프로젝트와 트렌드 소식을 받아보세요.
                        </Text>
                        <Stack direction={'row'}>
                            <Input
                                placeholder={'이메일 주소'}
                                bg="gray.700"
                                border={0}
                                _focus={{
                                    bg: 'gray.600',
                                }}
                            />
                            <Button
                                colorScheme="blue"
                                px={6}
                            >
                                구독
                            </Button>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default Footer;
