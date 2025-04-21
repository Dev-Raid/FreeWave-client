'use client';

import React from 'react';
import {SimpleGrid, GridItem, VStack, Box, Heading, Button, Text, Flex, Badge, IconButton} from '@chakra-ui/react';
import {FaPlus, FaDownload} from 'react-icons/fa';
import BioSection from '../profile/BioSection';
import SkillSelector from '../common/SkillSelector';
import PortfolioCard from "@/components/portfolio/PortfolioCard";

interface Portfolio {
    id: number;
    title: string;
    description: string;
    pdfFile: File | string; // File 객체 또는 PDF URL
    link: string;
    tags: string[];
}

interface ResumeTabProps {
    resume: {
        bio: string;
        skills: string[];
        portfolios: Portfolio[];
    };
    onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSkillsChange: (skills: string[]) => void;
    onPortfolioModalOpen: () => void;
    onDeletePortfolio: (id: number) => void;
}

const ResumeTab: React.FC<ResumeTabProps> = ({
                                                 resume,
                                                 onBioChange,
                                                 onSkillsChange,
                                                 onPortfolioModalOpen,
                                                 onDeletePortfolio
                                             }) => {
    return (
        <SimpleGrid columns={{base: 1, lg: 3}} spacing={8}>
            <GridItem colSpan={{base: 1, lg: 2}}>
                <VStack align="stretch" spacing={6}>
                    {/* 자기소개 (Bio) */}
                    <BioSection bio={resume.bio} onBioChange={onBioChange}/>

                    {/* 보유 기술 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={4}>보유 기술</Heading>
                        <SkillSelector selectedSkills={resume.skills} onSkillsChange={onSkillsChange}/>
                    </Box>

                    {/* 포트폴리오 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Flex justify="space-between" align="center" mb={6}>
                            <Heading size="md">포트폴리오</Heading>
                            <Button
                                leftIcon={<FaPlus/>}
                                colorScheme="blue"
                                onClick={onPortfolioModalOpen}
                            >
                                추가하기
                            </Button>
                        </Flex>

                        <SimpleGrid columns={{base: 1, md: 2}} spacing={6}>
                            {resume.portfolios.map((portfolio) => (
                                <PortfolioCard
                                    key={portfolio.id}
                                    portfolio={portfolio}
                                    onDelete={onDeletePortfolio}
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </GridItem>

            {/* 사이드바 */}
            <GridItem>
                <VStack align="stretch" spacing={6}>
                    {/* 이력서 다운로드 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={4}>이력서 다운로드</Heading>
                        <VStack align="stretch" spacing={3}>
                            <Button
                                leftIcon={<FaDownload/>}
                                colorScheme="blue"
                                variant="outline"
                                width="full"
                            >
                                PDF로 다운로드
                            </Button>
                            <Button
                                leftIcon={<FaDownload/>}
                                colorScheme="teal"
                                variant="outline"
                                width="full"
                            >
                                워드 문서로 다운로드
                            </Button>
                        </VStack>
                    </Box>

                    {/* 이력서 공개 설정 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={4}>공개 설정</Heading>
                        <VStack align="stretch" spacing={4}>
                            <Flex justify="space-between" align="center">
                                <Text>이력서 공개</Text>
                                <Button size="sm" colorScheme="green">공개중</Button>
                            </Flex>
                            <Text fontSize="sm" color="gray.600">
                                이력서를 공개하면 프로젝트 추천을 받을 수 있습니다.
                            </Text>
                        </VStack>
                    </Box>

                    {/* 이력서 통계 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Heading size="md" mb={4}>이력서 통계</Heading>
                        <VStack align="stretch" spacing={3}>
                            <Flex justify="space-between">
                                <Text>조회수</Text>
                                <Text fontWeight="bold">128</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text>프로젝트 제안</Text>
                                <Text fontWeight="bold">5</Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Text>최근 업데이트</Text>
                                <Text>2025년 4월 15일</Text>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
            </GridItem>
        </SimpleGrid>
    );
};

export default ResumeTab;
