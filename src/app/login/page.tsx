'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import {FaArrowLeft, FaGoogle, FaGithub} from 'react-icons/fa';
import {useAuth} from '@/contexts/AuthContext';

const LoginPage = () => {
    const router = useRouter();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth();

    // 폼 상태 관리
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    // 유효성 검사 오류 상태
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // 입력값 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // 입력 시 해당 필드의 오류 메시지 초기화
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        const newErrors = {
            email: '',
            password: '',
        };

        // 이메일 검사
        if (!formData.email) {
            newErrors.email = '이메일을 입력해주세요.';
        }

        // 비밀번호 검사
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        }

        // 오류가 있는지 확인
        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // 로그인 요청 보내기
        setIsLoading(true);

        try {
            await login(formData.email, formData.password, formData.rememberMe);

            // 로그인 성공 처리
            toast({
                title: '로그인 성공!',
                description: '환영합니다! 메인 페이지로 이동합니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // 메인 페이지로 이동
            router.push('/');
        } catch (error) {
            console.error('로그인 오류:', error);

            toast({
                title: '로그인 실패',
                description: '이메일 또는 비밀번호가 올바르지 않습니다.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // 소셜 로그인 핸들러
    const handleSocialLogin = (provider: string) => {
        toast({
            title: `${provider} 로그인`,
            description: `${provider} 로그인은 현재 구현 중입니다.`,
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box py={10} bg="gray.50" minH="100vh">
            <Container maxW="md">
                <VStack spacing={8} align="stretch">
                    <Link href="/" passHref>
                        <Button leftIcon={<FaArrowLeft/>} variant="ghost" alignSelf="flex-start">
                            홈으로 돌아가기
                        </Button>
                    </Link>

                    <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
                        <VStack spacing={6} align="stretch">
                            <Heading as="h1" size="xl" textAlign="center">
                                로그인
                            </Heading>

                            <Text color="gray.600" textAlign="center">
                                FreeWave에 오신 것을 환영합니다
                            </Text>

                            <form onSubmit={handleSubmit}>
                                <VStack spacing={4} align="stretch">
                                    <FormControl isRequired isInvalid={!!errors.email}>
                                        <FormLabel>이메일</FormLabel>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="이메일 주소를 입력하세요"
                                        />
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.password}>
                                        <FormLabel>비밀번호</FormLabel>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="비밀번호를 입력하세요"
                                        />
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>

                                    <Flex justify="space-between" align="center">
                                        <Checkbox
                                            name="rememberMe"
                                            isChecked={formData.rememberMe}
                                            onChange={handleChange}
                                        >
                                            <Text fontSize="sm">로그인 상태 유지</Text>
                                        </Checkbox>

                                        <Link href="/forgot-password" passHref>
                                            <Text color="blue.500" fontSize="sm">
                                                비밀번호를 잊으셨나요?
                                            </Text>
                                        </Link>
                                    </Flex>

                                    <Button
                                        type="submit"
                                        colorScheme="blue"
                                        size="lg"
                                        width="full"
                                        mt={4}
                                        isLoading={isLoading}
                                        loadingText="로그인 중..."
                                    >
                                        로그인
                                    </Button>
                                </VStack>
                            </form>

                            <HStack my={4}>
                                <Divider/>
                                <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                                    또는
                                </Text>
                                <Divider/>
                            </HStack>

                            <VStack spacing={3}>
                                <Button
                                    leftIcon={<FaGoogle/>}
                                    colorScheme="red"
                                    variant="outline"
                                    width="full"
                                    onClick={() => handleSocialLogin('Google')}
                                >
                                    Google로 계속하기
                                </Button>

                                <Button
                                    leftIcon={<FaGithub/>}
                                    colorScheme="gray"
                                    variant="outline"
                                    width="full"
                                    onClick={() => handleSocialLogin('GitHub')}
                                >
                                    GitHub로 계속하기
                                </Button>
                            </VStack>

                            <Flex justify="center" mt={4}>
                                <Text>계정이 없으신가요?</Text>
                                <Link href="/signup" passHref>
                                    <Text ml={2} color="blue.500" fontWeight="semibold">
                                        회원가입
                                    </Text>
                                </Link>
                            </Flex>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default LoginPage;
