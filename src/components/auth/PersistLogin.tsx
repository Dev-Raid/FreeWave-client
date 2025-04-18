'use client';

import {useEffect, useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';
import {Center, Spinner} from '@chakra-ui/react';

interface PersistLoginProps {
    children: React.ReactNode;
}

const PersistLogin = ({children}: PersistLoginProps) => {
    const [isVerifying, setIsVerifying] = useState(true);
    const {isAuthenticated, isLoading} = useAuth();

    useEffect(() => {
        // 인증 상태 확인이 완료되면 검증 상태 종료
        if (!isLoading) {
            // 약간의 지연 추가
            setTimeout(() => {
                setIsVerifying(false);
            }, 100);
        }
    }, [isLoading]);

    if (isLoading || isVerifying) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="blue.500" thickness="4px"/>
            </Center>
        );
    }

    return <>{children}</>;
};

export default PersistLogin;
