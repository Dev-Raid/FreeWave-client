'use client';

import {useState} from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import {FaComments, FaCreditCard, FaHandshake, FaSearch} from 'react-icons/fa';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import FreelancerCard from '@/components/freelancers/FreelancerCard';

// 임시 데이터
const featuredProjects = [
    {
        id: 1,
        title: '모바일 앱 UI/UX 디자인',
        budget: '2,000,000원',
        deadline: '2주',
        skills: ['Figma', 'Adobe XD', 'UI/UX'],
        clientName: '테크스타트',
    },
    {
        id: 2,
        title: '웹사이트 백엔드 개발',
        budget: '3,500,000원',
        deadline: '1개월',
        skills: ['Java', 'Spring Boot', 'MySQL'],
        clientName: '이커머스 코리아',
    },
    {
        id: 3,
        title: '마케팅 콘텐츠 제작',
        budget: '1,500,000원',
        deadline: '3주',
        skills: ['콘텐츠 마케팅', '카피라이팅'],
        clientName: '브랜드 솔루션즈',
    },
];

const topFreelancers = [
    {
        id: 1,
        name: '김디자이너',
        title: 'UI/UX 디자이너',
        rating: 4.9,
        skills: ['Figma', 'Adobe XD', 'UI/UX'],
        completedProjects: 32,
    },
    {
        id: 2,
        name: '박개발자',
        title: '풀스택 개발자',
        rating: 4.8,
        skills: ['React', 'Node.js', 'TypeScript'],
        completedProjects: 28,
    },
    {
        id: 3,
        name: '이마케터',
        title: '디지털 마케터',
        rating: 4.7,
        skills: ['SEO', 'Google Ads', '콘텐츠 마케팅'],
        completedProjects: 45,
    },
];

const HomePage = () => {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const [userType, setUserType] = useState<'client' | 'freelancer' | null>(null);

    return (
        <Box bg={bgColor} minH="100vh">
            <Header/>

            {/* 히어로 섹션 */}
            <Box
                bg="blue.600"
                color="white"
                py={20}
                backgroundImage="linear-gradient(135deg, #3182CE 0%, #4FD1C5 100%)"
            >
                <Container maxW="container.xl">
                    <VStack spacing={6} align="center" textAlign="center">
                        <Heading as="h1" size="2xl" fontWeight="bold">
                            FreeWave - 실시간 프리랜서 매칭 & 협업 플랫폼
                        </Heading>
                        <Text fontSize="xl" maxW="container.md">
                            프로젝트를 등록하고 실시간으로 프리랜서와 연결되어 협업까지 한 번에 해결하세요.
                            실시간 견적, 채팅, 결제까지 모든 과정이 원활하게 이루어집니다.
                        </Text>
                        <HStack spacing={4} pt={6}>
                            <Button
                                size="lg"
                                colorScheme="whiteAlpha"
                                onClick={() => setUserType('client')}
                            >
                                프로젝트 등록하기
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                colorScheme="whiteAlpha"
                                onClick={() => setUserType('freelancer')}
                            >
                                프리랜서로 시작하기
                            </Button>
                        </HStack>
                    </VStack>
                </Container>
            </Box>

            {/* 주요 기능 섹션 */}
            <Box py={16}>
                <Container maxW="container.xl">
                    <VStack spacing={12}>
                        <Heading as="h2" size="xl" textAlign="center">
                            FreeWave의 주요 기능
                        </Heading>

                        <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={10}>
                            <FeatureCard
                                icon={FaSearch}
                                title="간편한 프로젝트 등록"
                                description="몇 분 안에 프로젝트를 등록하고 실시간으로 견적을 받아보세요."
                            />
                            <FeatureCard
                                icon={FaHandshake}
                                title="실시간 매칭"
                                description="적합한 프리랜서와 즉시 연결되어 시간을 절약하세요."
                            />
                            <FeatureCard
                                icon={FaComments}
                                title="실시간 협업"
                                description="내장된 채팅 시스템으로 원활한 소통이 가능합니다."
                            />
                            <FeatureCard
                                icon={FaCreditCard}
                                title="안전한 결제"
                                description="프로젝트 완료 후 안전하게 결제와 정산이 이루어집니다."
                            />
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* 인기 프로젝트 섹션 */}
            <Box py={16} bg="gray.100">
                <Container maxW="container.xl">
                    <VStack spacing={8} align="stretch">
                        <Flex justify="space-between" align="center">
                            <Heading as="h2" size="xl">
                                인기 프로젝트
                            </Heading>
                            <Button colorScheme="blue" variant="outline">
                                모든 프로젝트 보기
                            </Button>
                        </Flex>

                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={8}>
                            {featuredProjects.map(project => (
                                <ProjectCard key={project.id} project={project}/>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* 인기 프리랜서 섹션 */}
            <Box py={16}>
                <Container maxW="container.xl">
                    <VStack spacing={8} align="stretch">
                        <Flex justify="space-between" align="center">
                            <Heading as="h2" size="xl">
                                인기 프리랜서
                            </Heading>
                            <Button colorScheme="blue" variant="outline">
                                모든 프리랜서 보기
                            </Button>
                        </Flex>

                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={8}>
                            {topFreelancers.map(freelancer => (
                                <FreelancerCard key={freelancer.id} freelancer={freelancer}/>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* CTA 섹션 */}
            <Box py={20} bg="blue.600" color="white">
                <Container maxW="container.xl">
                    <VStack spacing={8} textAlign="center">
                        <Heading as="h2" size="xl">
                            지금 바로 FreeWave와 함께 시작하세요
                        </Heading>
                        <Text fontSize="lg" maxW="container.md">
                            프리랜서와 클라이언트를 위한 최적의 플랫폼에서 여러분의 가능성을 펼쳐보세요.
                            실시간 매칭부터 협업, 결제까지 모든 과정이 원활하게 이루어집니다.
                        </Text>
                        <HStack spacing={4} pt={4}>
                            <Button size="lg" colorScheme="whiteAlpha">
                                무료로 시작하기
                            </Button>
                            <Button size="lg" variant="outline" colorScheme="whiteAlpha">
                                더 알아보기
                            </Button>
                        </HStack>
                    </VStack>
                </Container>
            </Box>

            <Footer/>
        </Box>
    );
};

// 기능 카드 컴포넌트
const FeatureCard = ({icon, title, description}: { icon: any; title: string; description: string }) => {
    return (
        <VStack
            spacing={4}
            p={6}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
            align="center"
            textAlign="center"
            transition="transform 0.3s"
            _hover={{transform: 'translateY(-5px)'}}
        >
            <Icon as={icon} boxSize={10} color="blue.500"/>
            <Heading as="h3" size="md">
                {title}
            </Heading>
            <Text color="gray.600">{description}</Text>
        </VStack>
    );
};

export default HomePage;
