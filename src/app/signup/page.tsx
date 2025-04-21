'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import {FaArrowLeft} from 'react-icons/fa';
import {useAuth} from '@/contexts/AuthContext';

const Page = () => {
    const router = useRouter();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const {signup} = useAuth();

    // 폼 상태 관리
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        userRole: 'ROLE_CLIENT' as 'ROLE_CLIENT' | 'ROLE_FREELANCER',
        imageUrl: 'https://freewave.s3.ap-northeast-2.amazonaws.com/default+profile.png',
        agreeTerms: false,
    });

    // 유효성 검사 오류 상태
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        agreeTerms: '',
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

    // 라디오 버튼(사용자 유형) 변경 핸들러
    const handleUserRoleChange = (value: string) => {
        setFormData({
            ...formData,
            userRole: value as 'ROLE_CLIENT' | 'ROLE_FREELANCER',
        });
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        const newErrors = {
            email: '',
            password: '',
            confirmPassword: '',
            nickname: '',
            agreeTerms: '',
        };

        // 이메일 검사
        if (!formData.email) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '유효한 이메일 주소를 입력해주세요.';
        }

        // 비밀번호 검사
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        } else if (formData.password.length < 8) {
            newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
        }

        // 비밀번호 확인 검사
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        // 이름 검사
        if (!formData.nickname) {
            newErrors.nickname = '이름을 입력해주세요.';
        }

        // 약관 동의 검사
        if (!formData.agreeTerms) {
            newErrors.agreeTerms = '서비스 이용약관에 동의해주세요.';
        }

        // 오류가 있는지 확인
        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // 회원가입 요청 보내기
        setIsLoading(true);

        try {
            // AuthContext의 signup 함수 사용
            await signup({
                email: formData.email,
                password: formData.password,
                userRole: formData.userRole,
                nickname: formData.nickname,
                imageUrl: formData.imageUrl
            });

            toast({
                title: '회원가입 성공!',
                description: '환영합니다! 로그인 페이지로 이동합니다.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // 로그인 페이지로 이동
            router.push('/login');
        } catch (error) {
            console.error('회원가입 오류:', error);

            toast({
                title: '회원가입 실패',
                description: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
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
                                회원가입
                            </Heading>

                            <Text color="gray.600" textAlign="center">
                                FreeWave에서 프리랜서와 클라이언트를 연결하세요
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
                                            placeholder="8자 이상의 비밀번호를 입력하세요"
                                        />
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                                        <FormLabel>비밀번호 확인</FormLabel>
                                        <Input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="비밀번호를 다시 입력하세요"
                                        />
                                        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isRequired isInvalid={!!errors.nickname}>
                                        <FormLabel>이름</FormLabel>
                                        <Input
                                            type="text"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            placeholder="이름을 입력하세요"
                                        />
                                        <FormErrorMessage>{errors.nickname}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl as="fieldset">
                                        <FormLabel as="legend">계정 유형</FormLabel>
                                        <RadioGroup value={formData.userRole} onChange={handleUserRoleChange}>
                                            <Stack direction="row">
                                                <Radio value="ROLE_CLIENT">클라이언트</Radio>
                                                <Radio value="ROLE_FREELANCER">프리랜서</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.agreeTerms}>
                                        <Checkbox
                                            name="agreeTerms"
                                            isChecked={formData.agreeTerms}
                                            onChange={handleChange}
                                        >
                                            <Text fontSize="sm">
                                                <Link href="/terms" passHref>
                                                    <Text as="span" color="blue.500">서비스 이용약관</Text>
                                                </Link>
                                                에 동의합니다
                                            </Text>
                                        </Checkbox>
                                        <FormErrorMessage>{errors.agreeTerms}</FormErrorMessage>
                                    </FormControl>

                                    <Button
                                        type="submit"
                                        colorScheme="blue"
                                        size="lg"
                                        width="full"
                                        mt={6}
                                        isLoading={isLoading}
                                        loadingText="가입 중..."
                                    >
                                        가입하기
                                    </Button>
                                </VStack>
                            </form>

                            <Flex justify="center" mt={4}>
                                <Text>이미 계정이 있으신가요?</Text>
                                <Link href="/login" passHref>
                                    <Text ml={2} color="blue.500" fontWeight="semibold">
                                        로그인
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

export default Page;
