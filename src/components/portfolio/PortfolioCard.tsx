'use client';

import React from 'react';
import { Box, Heading, Text, Button, IconButton, Flex } from '@chakra-ui/react';
import { FaTrash, FaEye } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// PDFPreview 컴포넌트를 dynamic import로 가져오기
const PDFPreview = dynamic(() => import('./PDFPreview'), {
    ssr: false,
});

// 인터페이스 정의
interface PortfolioCardProps {
    portfolio: {
        id: number;
        title: string;
        description: string;
        pdfFile: File | string;
    };
    onDelete: (id: number) => Promise<boolean>;
    onView?: (id: number) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
                                                         portfolio,
                                                         onDelete,
                                                         onView
                                                     }) => {
    const handleDelete = async () => {
        if (window.confirm('정말로 이 포트폴리오를 삭제하시겠습니까?')) {
            await onDelete(portfolio.id);
        }
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="md"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
        >
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Heading as="h3" size="md" noOfLines={1}>
                    {portfolio.title}
                </Heading>
                <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete portfolio"
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={handleDelete}
                />
            </Flex>

            <Box mb={4} height="150px" overflow="hidden">
                <PDFPreview file={portfolio.pdfFile} width={250} />
            </Box>

            <Text noOfLines={2} mb={3}>
                {portfolio.description}
            </Text>

            {onView && (
                <Button
                    leftIcon={<FaEye />}
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => onView(portfolio.id)}
                    width="full"
                >
                    상세보기
                </Button>
            )}
        </Box>
    );
};

export default PortfolioCard;
