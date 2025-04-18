'use client';

import {useState} from 'react';
import Link from 'next/link';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Input,
    Text,
    VStack,
    useToast,
    Alert,
    AlertIcon,
    AlertDescription,
} from '@chakra-ui/react';
import {FaArrowLeft} from 'react-icons/fa';

const ForgotPasswordPage = () => {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (!email) {
            setError('이메일을 입력해주세요.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            // 실제 API 연동 시 이 부분을 수정하세요
            // const response = await axios.post('/api/auth/forgot-password', { email });

            // 현재는 API 연동 없이 성공 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSubmitted(true);
        } catch (error) {
            console.error('비밀번호 재설정 요청 오류:', error);

            toast({
                title: '요청 실패',
                description: '비밀번호 재설정 요청 중 오류가 발생했습니다. 다시 시도해주세요.',
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
                    <Link href="/login" passHref>
                        <Button leftIcon={<FaArrowLeft/>} variant="ghost" alignSelf="flex-start">
                            로그인으로 돌아가기
                        </Button>
                    </Link>

                    <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
                        <VStack spacing={6} align="stretch">
                            <Heading as="h1" size="xl" textAlign="center">
                                비밀번호 찾기
                            </Heading>

                            {!isSubmitted ? (
                                <>
                                    <Text color="gray.600" textAlign="center">
                                        가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
                                    </Text>

                                    <form onSubmit={handleSubmit}>
                                        <VStack spacing={4} align="stretch">
                                            <FormControl isRequired isInvalid={!!error}>
                                                <FormLabel>이메일</FormLabel>
                                                <Input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="이메일 주소를 입력하세요"
                                                />
                                                <FormErrorMessage>{error}</FormErrorMessage>
                                            </FormControl>

                                            <Button
                                                type="submit"
                                                colorScheme="blue"
                                                size="lg"
                                                width="full"
                                                mt={4}
                                                isLoading={isLoading}
                                                loadingText="요청 중..."
                                            >
                                                비밀번호 재설정 링크 받기
                                            </Button>
                                        </VStack>
                                    </form>
                                </>
                            ) : (
                                <Alert
                                    status="success"
                                    variant="subtle"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                    height="200px"
                                    borderRadius="md"
                                >
                                    <AlertIcon boxSize="40px" mr={0}/>
                                    <AlertDescription maxWidth="sm" mt={4}>
                                        <VStack spacing={4}>
                                            <Text>
                                                비밀번호 재설정 링크가 <strong>{email}</strong>로 전송되었습니다.
                                            </Text>
                                            <Text>
                                                이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정해주세요.
                                            </Text>
                                            <Text fontSize="sm" color="gray.600">
                                                이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
                                            </Text>
                                        </VStack>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default ForgotPasswordPage;
