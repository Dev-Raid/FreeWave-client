'use client';

import {useState} from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    useColorMode,
    Icon
} from '@chakra-ui/react';
import {FaSearch, FaHandshake, FaComments, FaCreditCard} from 'react-icons/fa';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import FreelancerCard from '@/components/freelancers/FreelancerCard';

// 임시 데이터 - 프로젝트
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

// 임시 데이터 - 프리랜서
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
    const {colorMode} = useColorMode();
    const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.900';
    const [userRole, setUserRole] = useState<'ROLE_CLIENT' | 'ROLE_FREELANCER' | null>(null);
    const {isAuthenticated, user} = useAuth();
    const router = useRouter();

    const handleStartProject = () => {
        if (isAuthenticated) {
            // 이미 로그인한 사용자는 프로젝트 생성 페이지로 이동
            router.push('/projects/create');
        } else {
            // 로그인하지 않은 사용자는 로그인 페이지로 이동
            router.push('/login');
        }
    };

    const handleBrowseProjects = () => {
        router.push('/projects');
    };

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
                    <VStack gap={6} alignItems="center" textAlign="center">
                        <Heading as="h1" fontSize="5xl" fontWeight="bold">
                            {isAuthenticated
                                ? `안녕하세요, ${user?.nickname}님!`
                                : "FreeWave - 실시간 프리랜서 매칭 & 협업 플랫폼"}
                        </Heading>
                        <Text fontSize="xl" maxW="container.md">
                            {isAuthenticated
                                ? `${user?.userRole === 'ROLE_CLIENT'
                                    ? '필요한 프로젝트를 등록하고 최적의 프리랜서를 찾아보세요.'
                                    : '새로운 프로젝트를 찾고 실시간으로 견적을 제안해보세요.'}`
                                : "프로젝트를 등록하고 실시간으로 프리랜서와 연결되어 협업까지 한 번에 해결하세요. 실시간 견적, 채팅, 결제까지 모든 과정이 원활하게 이루어집니다."}
                        </Text>
                        <HStack gap={4} pt={6}>
                            {isAuthenticated ? (
                                <>
                                    {user?.userRole === 'ROLE_CLIENT' ? (
                                        <Button
                                            size="lg"
                                            colorScheme="blue"
                                            onClick={handleStartProject}
                                        >
                                            프로젝트 등록하기
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            colorScheme="blue"
                                            onClick={handleBrowseProjects}
                                        >
                                            프로젝트 찾아보기
                                        </Button>
                                    )}
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        colorScheme="whiteAlpha"
                                        onClick={() => router.push('/mypage')}
                                    >
                                        마이페이지
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size="lg"
                                        colorScheme="whiteAlpha"
                                        onClick={() => {
                                            setUserRole('ROLE_CLIENT');
                                            router.push('/signup');
                                        }}
                                    >
                                        프로젝트 등록하기
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        colorScheme="whiteAlpha"
                                        onClick={() => {
                                            setUserRole('ROLE_FREELANCER');
                                            router.push('/signup');
                                        }}
                                    >
                                        프리랜서로 시작하기
                                    </Button>
                                </>
                            )}
                        </HStack>
                    </VStack>
                </Container>
            </Box>

            {/* 로그인 상태에 따른 추천 섹션 */}
            {isAuthenticated && (
                <Box py={16}>
                    <Container maxW="container.xl">
                        <VStack gap={8} alignItems="stretch">
                            <Heading as="h2" fontSize="3xl">
                                {user?.userRole === 'ROLE_CLIENT'
                                    ? '추천 프리랜서'
                                    : '맞춤 프로젝트'}
                            </Heading>
                            <Text>
                                {user?.userRole === 'ROLE_CLIENT'
                                    ? '당신의 프로젝트에 적합한 프리랜서를 추천해 드립니다.'
                                    : '당신의 기술과 경험에 맞는 프로젝트를 추천해 드립니다.'}
                            </Text>
                            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={8}>
                                {user?.userRole === 'ROLE_CLIENT'
                                    ? topFreelancers.map(freelancer => (
                                        <FreelancerCard key={freelancer.id} freelancer={freelancer}/>
                                    ))
                                    : featuredProjects.map(project => (
                                        <ProjectCard key={project.id} project={project}/>
                                    ))}
                            </SimpleGrid>
                        </VStack>
                    </Container>
                </Box>
            )}

            {/* 주요 기능 섹션 */}
            <Box py={16}>
                <Container maxW="container.xl">
                    <VStack gap={12}>
                        <Heading as="h2" fontSize="3xl" textAlign="center">
                            FreeWave의 주요 기능
                        </Heading>

                        <SimpleGrid columns={{base: 1, md: 2, lg: 4}} gap={10}>
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
                    <VStack gap={8} alignItems="stretch">
                        <Flex justify="space-between" alignItems="center">
                            <Heading as="h2" fontSize="3xl">
                                인기 프로젝트
                            </Heading>
                            <Button colorScheme="blue" variant="outline" onClick={() => router.push('/projects')}>
                                모든 프로젝트 보기
                            </Button>
                        </Flex>

                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={8}>
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
                    <VStack gap={8} alignItems="stretch">
                        <Flex justify="space-between" alignItems="center">
                            <Heading as="h2" fontSize="3xl">
                                인기 프리랜서
                            </Heading>
                            <Button colorScheme="blue" variant="outline" onClick={() => router.push('/freelancers')}>
                                모든 프리랜서 보기
                            </Button>
                        </Flex>

                        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={8}>
                            {topFreelancers.map(freelancer => (
                                <FreelancerCard key={freelancer.id} freelancer={freelancer}/>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* CTA 섹션 - 로그인 상태에 따라 다른 내용 표시 */}
            <Box py={20} bg="blue.600" color="white">
                <Container maxW="container.xl">
                    <VStack gap={8} textAlign="center">
                        <Heading as="h2" fontSize="3xl">
                            {isAuthenticated
                                ? '지금 바로 FreeWave에서 활동을 시작하세요'
                                : '지금 바로 FreeWave와 함께 시작하세요'}
                        </Heading>
                        <Text fontSize="lg" maxW="container.md">
                            {isAuthenticated
                                ? '프로젝트를 찾거나 등록하고, 실시간으로 소통하며 성공적인 협업을 경험하세요.'
                                : '프리랜서와 클라이언트를 위한 최적의 플랫폼에서 여러분의 가능성을 펼쳐보세요. 실시간 매칭부터 협업, 결제까지 모든 과정이 원활하게 이루어집니다.'}
                        </Text>
                        <HStack gap={4} pt={4}>
                            {isAuthenticated ? (
                                <>
                                    {user?.userRole === 'ROLE_CLIENT' ? (
                                        <Button size="lg" colorScheme="whiteAlpha" onClick={handleStartProject}>
                                            새 프로젝트 시작하기
                                        </Button>
                                    ) : (
                                        <Button size="lg" colorScheme="whiteAlpha" onClick={handleBrowseProjects}>
                                            프로젝트 찾아보기
                                        </Button>
                                    )}
                                    <Button size="lg" variant="outline" colorScheme="whiteAlpha"
                                            onClick={() => router.push('/messages')}>
                                        메시지 확인하기
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button size="lg" colorScheme="whiteAlpha" onClick={() => router.push('/signup')}>
                                        무료로 시작하기
                                    </Button>
                                    <Button size="lg" variant="outline" colorScheme="whiteAlpha"
                                            onClick={() => router.push('/how-it-works')}>
                                        더 알아보기
                                    </Button>
                                </>
                            )}
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
            gap={4}
            p={6}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
            alignItems="center"
            textAlign="center"
            transition="transform 0.3s"
            _hover={{transform: 'translateY(-5px)'}}
        >
            <Icon as={icon} boxSize={10} color="blue.500"/>
            <Heading as="h3" fontSize="md">
                {title}
            </Heading>
            <Text color="gray.600">{description}</Text>
        </VStack>
    );
};

export default HomePage;
