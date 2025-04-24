'use client';

import React from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button, Box, Text
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// PDFPreview 컴포넌트를 dynamic import로 가져오기
const PDFPreview = dynamic(() => import('./PDFPreview'), {
    ssr: false,
});

// 인터페이스 정의
interface PortfolioViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    portfolio: {
        id: number;
        title: string;
        description: string;
        pdfFile: File | string;
    } | null;
}

const PortfolioViewModal: React.FC<PortfolioViewModalProps> = ({
                                                                   isOpen,
                                                                   onClose,
                                                                   portfolio
                                                               }) => {
    if (!portfolio) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{portfolio.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mb={4}>
                        <Text fontWeight="bold" mb={2}>설명</Text>
                        <Text>{portfolio.description}</Text>
                    </Box>

                    <Box>
                        <Text fontWeight="bold" mb={2}>PDF 문서</Text>
                        <Box borderWidth={1} borderRadius="md" p={2}>
                            <PDFPreview file={portfolio.pdfFile} width={500} />
                        </Box>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PortfolioViewModal;
