'use client';

import {createContext, ReactNode, useContext, useState} from 'react';
import api from '@/services/api';
import {useToast} from '@chakra-ui/react';

// 프로필 타입 정의
export interface Profile {
    userId: string;
    nickname: string;
    userRole: 'ROLE_CLIENT' | 'ROLE_FREELANCER';
    imageUrl: string;
    email: string;
}

// 프로필 업데이트 데이터 타입 정의
export interface ProfileUpdateData {
    nickname?: string;
    password?: string;
    userRole?: 'ROLE_CLIENT' | 'ROLE_FREELANCER';
}

// 프로필 컨텍스트 타입 정의
interface ProfileContextType {
    profile: Profile | null;
    isLoading: boolean;
    updateProfile: (data: ProfileUpdateData) => Promise<void>;
    uploadProfileImage: (file: File) => Promise<void>;
    refreshProfile: () => Promise<void>;
    updateBio: (bio: string) => Promise<any>; // 자기소개 업데이트 함수 추가
}

// 기본값으로 사용할 빈 컨텍스트 생성
const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    isLoading: false,
    updateProfile: async () => {
    },
    uploadProfileImage: async () => {
    },
    refreshProfile: async () => {
    },
    updateBio: async () => {
    },
});

// 컨텍스트 훅 생성
export const useProfile = () => useContext(ProfileContext);

// 컨텍스트 제공자 컴포넌트
export const ProfileProvider = ({children}: { children: ReactNode }) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    // 프로필 정보 새로고침 함수
    const refreshProfile = async () => {
        setIsLoading(true);

        try {
            // 토큰 확인
            const token = localStorage.getItem('access_token');
            if (!token) {
                setProfile(null);
                return;
            }

            // 사용자 프로필 정보 가져오기
            const response = await api.get('/api/v1/users/me', {withCredentials: true});

            if (response.data) {
                setProfile(response.data);
            }
        } catch (error) {
            console.error('프로필 정보 로드 오류:', error);
            toast({
                title: '프로필 정보를 불러오는데 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // 프로필 정보 업데이트 함수
    const updateProfile = async (data: ProfileUpdateData) => {
        setIsLoading(true);

        try {
            // 프로필 정보 업데이트 API 호출
            const response = await api.put('/api/v1/users/profiles', data, {
                withCredentials: true
            });

            if (response.data) {
                // 프로필 정보 업데이트 성공 시 상태 업데이트
                setProfile(prevProfile => {
                    if (!prevProfile) return response.data;
                    return {...prevProfile, ...response.data};
                });

                toast({
                    title: '프로필이 성공적으로 업데이트되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('프로필 업데이트 오류:', error);
            toast({
                title: '프로필 업데이트에 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 프로필 이미지 업로드 함수
    const uploadProfileImage = async (file: File) => {
        setIsLoading(true);

        try {
            // FormData 객체 생성
            const formData = new FormData();
            formData.append('file', file);

            // 이미지 업로드 API 호출
            const response = await api.put('/api/v1/users/profiles/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.data && response.data.imageUrl) {
                // 프로필 이미지 URL 업데이트
                setProfile(prevProfile => {
                    if (!prevProfile) return null;
                    return {...prevProfile, imageUrl: response.data.imageUrl};
                });

                toast({
                    title: '프로필 이미지가 업데이트되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('프로필 이미지 업로드 오류:', error);
            toast({
                title: '프로필 이미지 업로드에 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 자기소개 업데이트 함수
    const updateBio = async (bio: string) => {
        setIsLoading(true);

        try {
            // 자기소개 업데이트 API 호출
            const response = await api.put('/api/v1/users/profiles/bio', {bio}, {
                withCredentials: true
            });

            if (response.data) {
                // 프로필 정보 업데이트 성공 시 상태 업데이트
                setProfile(prevProfile => {
                    if (!prevProfile) return null;
                    return {...prevProfile, bio};
                });

                toast({
                    title: '자기소개가 성공적으로 업데이트되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                return response.data;
            }
        } catch (error) {
            console.error('자기소개 업데이트 오류:', error);
            toast({
                title: '자기소개 업데이트에 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 컨텍스트 값
    const value = {
        profile,
        isLoading,
        updateProfile,
        uploadProfileImage,
        refreshProfile,
        updateBio,
    };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
