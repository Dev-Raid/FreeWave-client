'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import api from '@/services/api';
import { useToast } from '@chakra-ui/react';

// 포트폴리오 인터페이스 정의
interface Portfolio {
    id: number;
    title: string;
    description: string;
    pdfFile: File | string;
}

// 포트폴리오 컨텍스트 타입 정의
interface PortfolioContextType {
    portfolios: Portfolio[];
    isLoading: boolean;
    addPortfolio: (title: string, description: string, pdfFile: File) => Promise<boolean>;
    deletePortfolio: (id: number) => Promise<boolean>;
    refreshPortfolios: () => Promise<Portfolio[]>;
}

// 기본값으로 사용할 빈 컨텍스트 생성
const PortfolioContext = createContext<PortfolioContextType>({
    portfolios: [],
    isLoading: false,
    addPortfolio: async () => false,
    deletePortfolio: async () => false,
    refreshPortfolios: async () => [],
});

// 컨텍스트 훅 생성
export const usePortfolio = () => useContext(PortfolioContext);

// 컨텍스트 제공자 컴포넌트
export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    // 포트폴리오 목록 조회 함수
    const refreshPortfolios = async (): Promise<Portfolio[]> => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/v1/portfolio', { withCredentials: true });
            if (response.data) {
                setPortfolios(response.data);
                return response.data;
            }
            return [];
        } catch (error) {
            console.error('포트폴리오 정보 로드 오류:', error);
            toast({
                title: '포트폴리오 정보를 불러오는데 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // 포트폴리오 추가 함수
    const addPortfolio = async (title: string, description: string, pdfFile: File): Promise<boolean> => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', pdfFile);
            formData.append('title', title);
            formData.append('description', description);

            const response = await api.post('/api/v1/portfolio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.data) {
                setPortfolios(prev => [...prev, response.data]);
                toast({
                    title: '포트폴리오가 성공적으로 추가되었습니다.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('포트폴리오 추가 오류:', error);
            toast({
                title: '포트폴리오 추가에 실패했습니다.',
                description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // 포트폴리오 삭제 함수
    const deletePortfolio = async (id: number): Promise<boolean> => {
        setIsLoading(true);
        try {
            await api.delete(`/api/v1/portfolio/${id}`, {
                withCredentials: true,
            });

            setPortfolios(prev => prev.filter(portfolio => portfolio.id !== id));
            toast({
                title: '포트폴리오가 삭제되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            return true;
        } catch (error) {
            console.error('포트폴리오 삭제 오류:', error);
            toast({
                title: '포트폴리오 삭제에 실패했습니다.',
                description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // 컨텍스트 값
    const value = {
        portfolios,
        isLoading,
        addPortfolio,
        deletePortfolio,
        refreshPortfolios,
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
