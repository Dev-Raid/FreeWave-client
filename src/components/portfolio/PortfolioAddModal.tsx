'use client';

import React, {useRef} from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,
    FormControl, FormLabel, Input, VStack, Textarea, FormHelperText, Flex, Box, Tag, IconButton, Center
} from '@chakra-ui/react';
import {FaTrash, FaUpload} from 'react-icons/fa';
import dynamic from 'next/dynamic';

// PDFPreview 컴포넌트를 dynamic import로 가져오기
const PDFPreview = dynamic(() => import('../portfolio/PDFPreview'), {
    ssr: false,
});

interface PortfolioAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    portfolio: {
        title: string;
        description: string;
        pdfFile: File | null;
        link: string;
        tags: string[];
    };
    onPortfolioChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPDFChange: (file: File) => void;
    onAddPortfolio: () => void;
    onAddPortfolioTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onRemovePortfolioTag: (tag: string) => void;
}

const PortfolioAddModal: React.FC<PortfolioAddModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 portfolio,
                                                                 onPortfolioChange,
                                                                 onPDFChange,
                                                                 onAddPortfolio,
                                                                 onAddPortfolioTag,
                                                                 onRemovePortfolioTag
                                                             }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            onPDFChange(file);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>포트폴리오 추가</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <VStack spacing={4} align="stretch">
                        {/* 제목 */}
                        <FormControl isRequired>
                            <FormLabel>제목</FormLabel>
                            <Input
                                name="title"
                                value={portfolio.title}
                                onChange={onPortfolioChange}
                                placeholder="포트폴리오 제목을 입력하세요"
                            />
                        </FormControl>

                        {/* 설명 */}
                        <FormControl isRequired>
                            <FormLabel>설명</FormLabel>
                            <Textarea
                                name="description"
                                value={portfolio.description}
                                onChange={onPortfolioChange}
                                placeholder="포트폴리오에 대한 설명을 입력하세요"
                                rows={4}
                            />
                        </FormControl>

                        {/* PDF 파일 업로드 */}
                        <FormControl isRequired>
                            <FormLabel>PDF 파일</FormLabel>
                            <Input
                                type="file"
                                accept="application/pdf"
                                ref={fileInputRef}
                                display="none"
                                onChange={handleFileChange}
                            />
                            <Button
                                leftIcon={<FaUpload/>}
                                onClick={() => fileInputRef.current?.click()}
                                width="full"
                                mb={4}
                            >
                                PDF 파일 업로드
                            </Button>

                            {portfolio.pdfFile && (
                                <Center border="1px" borderColor="gray.200" borderRadius="md" p={4} bg="gray.50">
                                    <PDFPreview file={portfolio.pdfFile} width={250}/>
                                </Center>
                            )}
                            <FormHelperText>PDF 파일을 업로드하면 첫 페이지가 미리보기로 표시됩니다.</FormHelperText>
                        </FormControl>

                        {/* 링크 */}
                        <FormControl>
                            <FormLabel>링크</FormLabel>
                            <Input
                                name="link"
                                value={portfolio.link}
                                onChange={onPortfolioChange}
                                placeholder="작업물 링크를 입력하세요 (선택사항)"
                            />
                        </FormControl>

                        {/* 태그 */}
                        <FormControl>
                            <FormLabel>태그</FormLabel>
                            <Input
                                placeholder="태그를 입력하고 Enter를 누르세요"
                                onKeyPress={onAddPortfolioTag}
                            />
                            <Flex flexWrap="wrap" gap={2} mt={2}>
                                {portfolio.tags.map((tag, index) => (
                                    <Tag
                                        key={index}
                                        colorScheme="blue"
                                        size="md"
                                        borderRadius="full"
                                    >
                                        <Box px={1}>{tag}</Box>
                                        <IconButton
                                            icon={<FaTrash/>}
                                            size="xs"
                                            colorScheme="blue"
                                            variant="ghost"
                                            ml={1}
                                            onClick={() => onRemovePortfolioTag(tag)}
                                            aria-label={`Remove ${tag}`}
                                        />
                                    </Tag>
                                ))}
                            </Flex>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onAddPortfolio}>
                        추가하기
                    </Button>
                    <Button onClick={onClose}>취소</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PortfolioAddModal;
