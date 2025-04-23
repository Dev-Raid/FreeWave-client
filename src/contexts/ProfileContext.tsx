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
    bio?: string;
    skills?: string[];
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
    refreshProfile: () => Promise<Profile | null>;
    updateBio: (bio: string) => Promise<any>;
    updateSkills: (skills: string[]) => Promise<any>;
    getSkills: () => Promise<string[]>;
    deleteSkill: (skill: string) => Promise<boolean>;
}

// 기본값으로 사용할 빈 컨텍스트 생성
const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    isLoading: false,
    updateProfile: async () => {
    },
    uploadProfileImage: async () => {
    },
    refreshProfile: async () => null,
    updateBio: async () => {
    },
    updateSkills: async () => {
    },
    getSkills: async () => [],
    deleteSkill: async () => false,
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
                return null;
            }

            // 사용자 프로필 정보 가져오기
            const response = await api.get('/api/v1/users/me', {withCredentials: true});

            if (response.data) {
                setProfile(response.data);
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('프로필 정보 로드 오류:', error);
            toast({
                title: '프로필 정보를 불러오는데 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return null;
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

    // 기술 스택 업데이트 함수
    const updateSkills = async (skills: string[]) => {
        setIsLoading(true);

        try {
            // 기술 스택 업데이트 API 호출
            const response = await api.put('/api/v1/resumes/skills', {skills}, {
                withCredentials: true
            });

            if (response.data) {
                // 프로필 정보 업데이트 성공 시 상태 업데이트
                setProfile(prevProfile => {
                    if (!prevProfile) return null;
                    return {...prevProfile, skills};
                });

                toast({
                    title: '기술 스택이 성공적으로 업데이트되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                return response.data;
            }
        } catch (error) {
            console.error('기술 스택 업데이트 오류:', error);
            toast({
                title: '기술 스택 업데이트에 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 기술 스택 조회 함수
    const getSkills = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/v1/resumes/skills', {
                withCredentials: true
            });

            if (response.data && Array.isArray(response.data.skills)) {
                return response.data.skills;
            }
            return [];
        } catch (error) {
            console.error('기술 스택 조회 오류:', error);
            toast({
                title: '기술 스택 조회에 실패했습니다.',
                description: '서버 연결을 확인해주세요.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // 기술 스택 삭제 함수
    const deleteSkill = async (skill: string) => {
        setIsLoading(true);
        try {
            // 기술 스택 삭제 API 호출
            await api.delete(`/api/v1/resumes/skills/${skill}`, {
                withCredentials: true
            });

            // 프로필 정보 업데이트 (삭제된 기술 스택 제외)
            setProfile(prevProfile => {
                if (!prevProfile) return null;

                // 삭제된 기술 스택을 필터링하여 새 배열 생성
                const updatedSkills = prevProfile.skills?.filter(s => s !== skill) || [];
                console.log('삭제 후 남은 기술 스택:', updatedSkills);

                return {
                    ...prevProfile,
                    skills: updatedSkills
                };
            });

            // 추가: 상태 업데이트 후 콜백 함수 실행 (옵션)
            setTimeout(() => {
                console.log('현재 프로필 상태:', profile);
            }, 0);

            toast({
                title: '기술 스택이 삭제되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            return true;
        } catch (error) {
            console.error('기술 스택 삭제 오류:', error);
            toast({
                title: '기술 스택 삭제에 실패했습니다.',
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
        updateSkills,
        getSkills,
        deleteSkill,
    };

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
