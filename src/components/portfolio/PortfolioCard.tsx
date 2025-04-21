'use client';

import React from 'react';
import {Box, Heading, Text, Flex, Badge, Button, IconButton} from '@chakra-ui/react';
import {FaLink, FaTrash} from 'react-icons/fa';
import dynamic from 'next/dynamic';

// PDFPreview 컴포넌트를 dynamic import로 가져오기
const PDFPreview = dynamic(() => import('../portfolio/PDFPreview'), {
    ssr: false,
});

interface PortfolioCardProps {
    portfolio: {
        id: number;
        title: string;
        description: string;
        pdfFile: File | string;
        link: string;
        tags: string[];
    };
    onDelete: (id: number) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({portfolio, onDelete}) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            transition="transform 0.2s"
            _hover={{transform: 'translateY(-4px)', boxShadow: 'md'}}
        >
            <Box
                h="200px"
                position="relative"
                overflow="hidden"
                bg="gray.100"
            >
                <PDFPreview file={portfolio.pdfFile} width={300}/>
                <Flex
                    position="absolute"
                    top={2}
                    right={2}
                    gap={2}
                >
                    <IconButton
                        icon={<FaTrash/>}
                        aria-label="Delete portfolio"
                        size="sm"
                        colorScheme="red"
                        onClick={() => onDelete(portfolio.id)}
                    />
                </Flex>
            </Box>
            <Box p={4}>
                <Heading size="md" mb={2}>{portfolio.title}</Heading>
                <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                    {portfolio.description}
                </Text>
                <Flex flexWrap="wrap" gap={2} mb={3}>
                    {portfolio.tags.map((tag, idx) => (
                        <Badge key={idx} colorScheme="blue" variant="subtle">
                            {tag}
                        </Badge>
                    ))}
                </Flex>
                {portfolio.link && (
                    <Button
                        as="a"
                        href={portfolio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        leftIcon={<FaLink/>}
                        colorScheme="blue"
                        variant="outline"
                        width="full"
                    >
                        작업물 보기
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default PortfolioCard;
