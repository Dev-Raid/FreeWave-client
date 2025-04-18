'use client';

import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Stat,
    StatNumber,
    StatHelpText,
    Flex,
    Badge,
    Button
} from '@chakra-ui/react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import {useAuth} from '@/contexts/AuthContext';

const MyPage = () => {
    const {user} = useAuth();

    return (
        <ProtectedRoute>
            <Box py={8}>
                <Container maxW="container.xl">
                    <VStack spacing={8} align="stretch">
                        <Heading as="h1" size="xl">
                            마이페이지
                        </Heading>

                        <Text fontSize="lg">
                            안녕하세요, <strong>{user?.name}</strong>님! {user?.userType === 'client' ? '클라이언트' : '프리랜서'}로
                            등록되어 있습니다.
                        </Text>

                        <Tabs colorScheme="blue" variant="enclosed">
                            <TabList>
                                <Tab>대시보드</Tab>
                                <Tab>내 프로젝트</Tab>
                                <Tab>메시지</Tab>
                                <Tab>결제 내역</Tab>
                                <Tab>계정 설정</Tab>
                            </TabList>

                            <TabPanels>
                                {/* 대시보드 탭 */}
                                <TabPanel>
                                    <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={6}>
                                        <Card>
                                            <CardHeader>
                                                <Heading size="md">활성 프로젝트</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stat>
                                                    <StatNumber>3</StatNumber>
                                                    <StatHelpText>진행 중인 프로젝트</StatHelpText>
                                                </Stat>
                                            </CardBody>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <Heading size="md">완료된 프로젝트</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stat>
                                                    <StatNumber>12</StatNumber>
                                                    <StatHelpText>성공적으로 완료됨</StatHelpText>
                                                </Stat>
                                            </CardBody>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <Heading size="md">새 메시지</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stat>
                                                    <StatNumber>5</StatNumber>
                                                    <StatHelpText>읽지 않은 메시지</StatHelpText>
                                                </Stat>
                                            </CardBody>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <Heading size="md">평점</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Stat>
                                                    <StatNumber>4.8 / 5</StatNumber>
                                                    <StatHelpText>15개 리뷰 기준</StatHelpText>
                                                </Stat>
                                            </CardBody>
                                        </Card>
                                    </SimpleGrid>

                                    <Heading size="md" mt={8} mb={4}>
                                        최근 활동
                                    </Heading>

                                    <VStack spacing={4} align="stretch">
                                        <ActivityItem
                                            title="새 프로젝트 제안 수신"
                                            description="웹사이트 리디자인 프로젝트에 대한 새로운 제안을 받았습니다."
                                            date="오늘"
                                            type="proposal"
                                        />

                                        <ActivityItem
                                            title="프로젝트 완료"
                                            description="모바일 앱 UI 디자인 프로젝트가 성공적으로 완료되었습니다."
                                            date="어제"
                                            type="completed"
                                        />

                                        <ActivityItem
                                            title="새 메시지"
                                            description="김개발자님으로부터 새 메시지가 도착했습니다."
                                            date="2일 전"
                                            type="message"
                                        />
                                    </VStack>
                                </TabPanel>

                                {/* 내 프로젝트 탭 */}
                                <TabPanel>
                                    <Text>내 프로젝트 목록이 여기에 표시됩니다.</Text>
                                </TabPanel>

                                {/* 메시지 탭 */}
                                <TabPanel>
                                    <Text>메시지 목록이 여기에 표시됩니다.</Text>
                                </TabPanel>

                                {/* 결제 내역 탭 */}
                                <TabPanel>
                                    <Text>결제 내역이 여기에 표시됩니다.</Text>
                                </TabPanel>

                                {/* 계정 설정 탭 */}
                                <TabPanel>
                                    <Text>계정 설정이 여기에 표시됩니다.</Text>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </VStack>
                </Container>
            </Box>
        </ProtectedRoute>
    );
};

// 활동 항목 컴포넌트
const ActivityItem = ({title, description, date, type}: {
    title: string;
    description: string;
    date: string;
    type: 'proposal' | 'completed' | 'message'
}) => {
    const getBadgeColor = () => {
        switch (type) {
            case 'proposal':
                return 'blue';
            case 'completed':
                return 'green';
            case 'message':
                return 'purple';
            default:
                return 'gray';
        }
    };

    const getBadgeText = () => {
        switch (type) {
            case 'proposal':
                return '제안';
            case 'completed':
                return '완료';
            case 'message':
                return '메시지';
            default:
                return '활동';
        }
    };

    return (
        <Card variant="outline">
            <CardBody>
                <Flex justify="space-between" align="center">
                    <Box>
                        <Flex align="center" mb={2}>
                            <Heading size="sm">{title}</Heading>
                            <Badge ml={2} colorScheme={getBadgeColor()}>
                                {getBadgeText()}
                            </Badge>
                        </Flex>
                        <Text color="gray.600">{description}</Text>
                    </Box>

                    <Flex direction="column" align="flex-end">
                        <Text fontSize="sm" color="gray.500">{date}</Text>
                        <Button size="sm" variant="ghost" colorScheme="blue" mt={2}>
                            자세히 보기
                        </Button>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default MyPage;
