'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import {Box, Center, Spinner} from '@chakra-ui/react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roleRequired?: 'ROLE_CLIENT' | 'ROLE_FREELANCER';
}

const ProtectedRoute = ({children, roleRequired}: ProtectedRouteProps) => {
    const {isAuthenticated, isLoading, user} = useAuth();
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            // 인증 로딩이 완료될 때까지 대기
            if (!isLoading) {
                if (!isAuthenticated) {
                    // 인증되지 않은 경우 로그인 페이지로 리디렉션
                    router.push('/login');
                } else if (roleRequired && user?.userRole !== roleRequired) {
                    // 필요한 역할이 없는 경우 권한 없음 페이지로 리디렉션
                    router.push('/unauthorized');
                } else {
                    // 인증 완료
                    setIsVerifying(false);
                }
            }
        };

        verifyAuth();
    }, [isAuthenticated, isLoading, router, roleRequired, user]);

    if (isLoading || isVerifying) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="blue.500" thickness="4px"/>
            </Center>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
