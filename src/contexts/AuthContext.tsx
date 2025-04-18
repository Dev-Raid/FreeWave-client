'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import api from '@/services/api';

// 사용자 타입 정의
interface User {
    userId: string;
    nickname: string;
    userRole: 'ROLE_CLIENT' | 'ROLE_FREELANCER';
}

// 인증 컨텍스트 타입 정의
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    signup: (userData: SignupData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

// 회원가입 데이터 타입 정의
interface SignupData {
    email: string;
    password: string;
    nickname: string;
    userRole: 'ROLE_CLIENT' | 'ROLE_FREELANCER';
}

// 기본값으로 사용할 빈 컨텍스트 생성
const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    login: async () => {
    },
    signup: async () => {
    },
    logout: () => {
    },
    isAuthenticated: false,
});

// 컨텍스트 훅 생성
export const useAuth = () => useContext(AuthContext);

// 컨텍스트 제공자 컴포넌트
export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    // 컴포넌트 마운트 시 사용자 정보 로드
    useEffect(() => {
        const loadUser = async () => {
            setIsLoading(true); // 로딩 상태 시작

            try {
                // 로컬 스토리지에서 토큰 확인
                const token = localStorage.getItem('access_token');

                if (!token) {
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                // 사용자 정보 가져오기
                try {
                    const response = await api.get('/api/v1/user/me', {withCredentials: true});

                    if (response.data) {
                        setUser(response.data);
                    }
                } catch (error) {
                    console.error('사용자 정보 로드 오류:', error);
                    setUser(null);
                }
            } finally {
                // 약간의 지연 후 로딩 상태 종료
                setTimeout(() => {
                    setIsLoading(false);
                }, 100);
            }
        };

        loadUser();
    }, []);

    // 로그인 함수
    const login = async (email: string, password: string, rememberMe: boolean) => {
        setIsLoading(true);

        try {
            // 로그인 API 호출 (withCredentials: true를 설정하여 쿠키를 받을 수 있게 함)
            const response = await api.post('/api/v1/auth/login',
                {
                    email,
                    password
                },
                {withCredentials: true} // 중요: 쿠키를 받기 위해 필요
            );

            console.log('로그인 응답:', response);

            // 헤더에서 액세스 토큰 추출 (소문자로 접근해야 함)
            const accessToken = response.headers['authorization'];

            console.log('헤더에서 추출한 액세스 토큰:', accessToken);

            if (!accessToken) {
                // 헤더에 토큰이 없는 경우 응답 본문에서 확인
                if (response.data && response.data.accessToken) {
                    console.log('응답 본문에서 액세스 토큰 발견');
                    localStorage.setItem('access_token', response.data.accessToken);
                } else {
                    throw new Error('액세스 토큰을 찾을 수 없습니다');
                }
            } else {
                // Bearer 접두사 제거 (필요한 경우)
                const tokenValue = accessToken.startsWith('Bearer ')
                    ? accessToken.substring(7)
                    : accessToken;

                localStorage.setItem('access_token', tokenValue);
            }

            // 로그인 유지 설정 저장
            localStorage.setItem('remember_me', rememberMe.toString());

            // 사용자 정보 설정 (응답 본문에 있는 경우)
            if (response.data && response.data.user) {
                setUser(response.data.user);
            } else {
                // 사용자 정보가 응답에 없는 경우 별도로 요청
                // withCredentials: true를 설정하여 쿠키를 함께 전송
                const userResponse = await api.get('/api/v1/user/me', {withCredentials: true});
                setUser(userResponse.data);
            }

            return;
        } catch (error) {
            console.error('로그인 오류:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };


    // 회원가입 함수
    const signup = async (userData: SignupData) => {
        setIsLoading(true);

        try {
            // 회원가입 API 호출
            const response = await api.post('/api/v1/auth/signup', {
                email: userData.email,
                password: userData.password,
                userRole: userData.userRole,
                nickname: userData.nickname,
            });

            return response.data;
        } catch (error) {
            console.error('회원가입 오류:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            // 서버에 로그아웃 요청을 보내 리프레시 토큰 쿠키를 삭제
            await api.post('/api/v1/auth/logout', {}, {withCredentials: true});
        } catch (error) {
            console.error('로그아웃 API 호출 오류:', error);
            // API 호출이 실패해도 클라이언트 측에서는 로그아웃 처리를 계속 진행
        } finally {
            // 로컬 스토리지에서 액세스 토큰 제거
            localStorage.removeItem('access_token');
            localStorage.removeItem('remember_me');

            // 사용자 정보 초기화
            setUser(null);

            // 홈페이지로 리디렉션
            router.push('/');
        }
    };

    // 컨텍스트 값
    const value = {
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
