'use client';

import React, { useRef, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button, FormControl, FormLabel, Input, VStack, Textarea, FormHelperText, Box
} from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// PDFPreview 컴포넌트를 dynamic import로 가져오기
const PDFPreview = dynamic(() => import('./PDFPreview'), {
    ssr: false,
});

// 인터페이스 정의
interface PortfolioAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPortfolio: (title: string, description: string, pdfFile: File) => Promise<boolean>;
}

const PortfolioAddModal: React.FC<PortfolioAddModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 onAddPortfolio
                                                             }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    // 파일 변경 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = async () => {
        // 필수 필드 검증
        if (!title || !description || !pdfFile) {
            alert('제목, 설명, PDF 파일은 필수 항목입니다.');
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await onAddPortfolio(title, description, pdfFile);
            if (success) {
                // 폼 초기화
                setTitle('');
                setDescription('');
                setPdfFile(null);
                onClose();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>포트폴리오 추가</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        {/* 제목 */}
                        <FormControl isRequired>
                            <FormLabel>제목</FormLabel>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="포트폴리오 제목을 입력하세요"
                            />
                        </FormControl>

                        {/* 설명 */}
                        <FormControl isRequired>
                            <FormLabel>설명</FormLabel>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="포트폴리오에 대한 설명을 입력하세요"
                                resize="vertical"
                                minHeight="120px"
                            />
                        </FormControl>

                        {/* PDF 파일 업로드 */}
                        <FormControl isRequired>
                            <FormLabel>PDF 파일</FormLabel>
                            <input
                                type="file"
                                accept="application/pdf"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <Button
                                leftIcon={<FaUpload />}
                                onClick={() => fileInputRef.current?.click()}
                                width="full"
                                mb={4}
                            >
                                PDF 파일 업로드
                            </Button>
                            {pdfFile && (
                                <Box mt={2} borderWidth={1} borderRadius="md" p={2}>
                                    <PDFPreview file={pdfFile} width={300} />
                                </Box>
                            )}
                            <FormHelperText>
                                PDF 파일을 업로드하면 첫 페이지가 미리보기로 표시됩니다.
                            </FormHelperText>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        loadingText="추가 중..."
                    >
                        추가하기
                    </Button>
                    <Button variant="ghost" onClick={onClose}>취소</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PortfolioAddModal;
