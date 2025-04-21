'use client';

import React from 'react';
import {SimpleGrid, Box, VStack, Heading, Text, HStack, Icon, Badge, Flex, Progress} from '@chakra-ui/react';
import {FaCheck} from 'react-icons/fa';
import BioSection from './BioSection';

interface User {
    userId?: string | number;
    nickname?: string;
    userRole?: string;
    email?: string;
    profileImage?: string;
}

interface ProfileTabProps {
    user: User | null;
    resume: {
        bio: string;
    };
    onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({user, resume, onBioChange}) => {
    return (
        <SimpleGrid columns={{base: 1, lg: 3}} spacing={8}>
            <Box gridColumn="span 2">
                <VStack align="stretch" spacing={6}>
                    {/* 자기소개 */}
                    <BioSection bio={resume.bio} onBioChange={onBioChange}/>

                    {user?.userRole === 'ROLE_CLIENT' && (
                        <>
                            {/* 회사 정보 */}
                            <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                                <Heading size="md" mb={4}>회사 정보</Heading>
                                <SimpleGrid columns={2} spacing={4}>
                                    <Box>
                                        <Text fontWeight="bold">회사명</Text>
                                        <Text>테크스타트 주식회사</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">업종</Text>
                                        <Text>IT 서비스</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">설립일</Text>
                                        <Text>2020년 5월</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">직원 수</Text>
                                        <Text>25명</Text>
                                    </Box>
                                </SimpleGrid>
                            </Box>
                        </>
                    )}
                </VStack>
            </Box>

            {/* 사이드바 */}
            <Box>
                <VStack align="stretch" spacing={6}>
                    {/* 인증 상태 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={4}>인증 상태</Heading>
                        <VStack align="stretch" spacing={3}>
                            <Flex justify="space-between">
                                <HStack>
                                    <Icon as={FaCheck} color="green.500"/>
                                    <Text>이메일 인증</Text>
                                </HStack>
                                <Badge colorScheme="green">완료</Badge>
                            </Flex>
                            <Flex justify="space-between">
                                <HStack>
                                    <Icon as={FaCheck} color="green.500"/>
                                    <Text>휴대폰 인증</Text>
                                </HStack>
                                <Badge colorScheme="green">완료</Badge>
                            </Flex>
                        </VStack>
                    </Box>

                    {/* 계정 통계 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={4}>계정 통계</Heading>
                        <VStack align="stretch" spacing={4}>
                            <Box>
                                <Flex justify="space-between" mb={1}>
                                    <Text fontSize="sm">프로필 완성도</Text>
                                    <Text fontSize="sm" fontWeight="bold">85%</Text>
                                </Flex>
                                <Progress value={85} colorScheme="blue" size="sm" borderRadius="full"/>
                            </Box>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        </SimpleGrid>
    );
};

export default ProfileTab;
