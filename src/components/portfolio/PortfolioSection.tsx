'use client';

import React, {useEffect, useRef, useState} from 'react';
import {
    Box, Heading, SimpleGrid, Button, useDisclosure, Spinner, Center, Text
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { usePortfolio } from '@/contexts/PortfolioContext';
import PortfolioCard from './PortfolioCard';
import PortfolioAddModal from './PortfolioAddModal';
import PortfolioViewModal from './PortfolioViewModal';

const PortfolioSection: React.FC = () => {
    const { portfolios, isLoading, addPortfolio, deletePortfolio, refreshPortfolios } = usePortfolio();
    const {
        isOpen: isAddModalOpen,
        onOpen: onAddModalOpen,
        onClose: onAddModalClose
    } = useDisclosure();
    const {
        isOpen: isViewModalOpen,
        onOpen: onViewModalOpen,
        onClose: onViewModalClose
    } = useDisclosure();
    const [selectedPortfolio, setSelectedPortfolio] = useState<typeof portfolios[0] | null>(null);
    const initialLoadDone = useRef(false);

    // 컴포넌트 마운트 시 포트폴리오 목록 조회
    useEffect(() => {
        if (!initialLoadDone.current) {
            refreshPortfolios();
            initialLoadDone.current = true;
        }
    }, []);

    // 포트폴리오 추가 핸들러
    const handleAddPortfolio = async (title: string, description: string, pdfFile: File) => {
        const success = await addPortfolio(title, description, pdfFile);
        if (success) {
            onAddModalClose();
        }
        return success;
    };

    // 포트폴리오 상세 보기 핸들러
    const handleViewPortfolio = (id: number) => {
        const portfolio = portfolios.find(p => p.id === id);
        if (portfolio) {
            setSelectedPortfolio(portfolio);
            onViewModalOpen();
        }
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Heading as="h2" size="lg">포트폴리오</Heading>
                <Button
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    onClick={onAddModalOpen}
                >
                    추가하기
                </Button>
            </Box>

            {isLoading ? (
                <Center py={10}>
                    <Spinner size="xl" />
                </Center>
            ) : portfolios.length === 0 ? (
                <Center py={10}>
                    <Text>등록된 포트폴리오가 없습니다. 새 포트폴리오를 추가해보세요.</Text>
                </Center>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {portfolios.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio.id}
                            portfolio={portfolio}
                            onDelete={deletePortfolio}
                            onView={handleViewPortfolio}
                        />
                    ))}
                </SimpleGrid>
            )}

            {/* 포트폴리오 추가 모달 */}
            <PortfolioAddModal
                isOpen={isAddModalOpen}
                onClose={onAddModalClose}
                onAddPortfolio={handleAddPortfolio}
            />

            {/* 포트폴리오 상세 보기 모달 */}
            <PortfolioViewModal
                isOpen={isViewModalOpen}
                onClose={onViewModalClose}
                portfolio={selectedPortfolio}
            />
        </Box>
    );
};

export default PortfolioSection;
