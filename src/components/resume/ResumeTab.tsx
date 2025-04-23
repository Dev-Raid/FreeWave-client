'use client';

import React, {useEffect, useState, useRef} from 'react';
import {SimpleGrid, GridItem, VStack, Box, Heading, Button, Text, Flex, Spinner} from '@chakra-ui/react';
import {FaPlus, FaDownload} from 'react-icons/fa';
import BioSection from '../profile/BioSection';
import SkillSelector from '../common/SkillSelector';
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import {useProfile} from '@/contexts/ProfileContext';
import {useToast} from '@chakra-ui/react';

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
                                                 onPortfolioModalOpen,
                                                 onDeletePortfolio
                                             }) => {
    const {updateSkills, getSkills, isLoading} = useProfile();
    const toast = useToast();
    const [isSkillsLoading, setIsSkillsLoading] = useState(false);
    const [skills, setSkills] = useState<string[]>([]);
    const apiRequestRef = useRef(false);

    // 컴포넌트 마운트 시 기술 스택 조회
    useEffect(() => {
        // 이미 요청이 진행 중이거나 완료된 경우 중복 요청 방지
        if (apiRequestRef.current || skills.length > 0) return;

        const loadSkills = async () => {
            apiRequestRef.current = true;
            setIsSkillsLoading(true);
            try {
                const fetchedSkills = await getSkills();
                console.log("조회된 스킬:", fetchedSkills);

                // 조회된 스킬을 로컬 상태에만 설정하고 업데이트 요청은 보내지 않음
                setSkills(fetchedSkills);

                if (fetchedSkills.length > 0) {
                    toast({
                        title: '기술 스택을 불러왔습니다.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error("스킬 조회 실패:", error);
                toast({
                    title: '기술 스택 조회에 실패했습니다.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setIsSkillsLoading(false);
            }
        };

        loadSkills();

        // 컴포넌트 언마운트 시 정리 함수
        return () => {
            apiRequestRef.current = true; // 중복 요청 방지
        };
    }, [getSkills, toast, skills.length]);


    // 기술 스택 변경 핸들러
    const handleSkillsChange = async (newSkills: string[]) => {
        // 현재 스킬과 새 스킬이 같으면 아무 작업도 하지 않음
        if (JSON.stringify(skills) === JSON.stringify(newSkills)) {
            return;
        }

        try {
            await updateSkills(newSkills);
            // 로컬 상태도 업데이트
            setSkills(newSkills);
        } catch (error) {
            console.error('기술 스택 업데이트 실패:', error);
            toast({
                title: '기술 스택 업데이트에 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <SimpleGrid columns={{base: 1, lg: 3}} spacing={8}>
            <GridItem colSpan={{base: 1, lg: 2}}>
                <VStack align="stretch" spacing={6}>
                    {/* 자기소개 (Bio) */}
                    <BioSection
                        bio={resume.bio}
                        onBioChange={onBioChange}
                    />

                    {/* 보유 기술 */}
                    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                        <Flex justify="space-between" align="center" mb={4}>
                            <Heading size="md">보유 기술</Heading>
                        </Flex>

                        {isSkillsLoading ? (
                            <Flex justify="center" align="center" height="100px">
                                <Spinner size="lg" color="blue.500"/>
                            </Flex>
                        ) : (
                            <SkillSelector
                                selectedSkills={skills} // 로컬 상태의 스킬 사용
                                onSkillsChange={handleSkillsChange}
                                isLoading={isLoading}
                            />
                        )}
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
