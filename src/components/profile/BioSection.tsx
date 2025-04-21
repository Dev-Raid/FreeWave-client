'use client';

import React, {useState} from 'react';
import {Box, Button, Flex, Heading, Text, Textarea, useToast} from '@chakra-ui/react';
import {FaEdit, FaCheck} from 'react-icons/fa';

interface BioSectionProps {
    bio: string;
    onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BioSection: React.FC<BioSectionProps> = ({bio, onBioChange}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const toast = useToast();

    const handleSave = () => {
        setIsEditing(false);
        toast({
            title: '자기소개가 업데이트되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
            <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">자기소개</Heading>
                <Button
                    size="sm"
                    leftIcon={isEditing ? <FaCheck/> : <FaEdit/>}
                    colorScheme="blue"
                    variant="outline"
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                    {isEditing ? '저장' : '수정'}
                </Button>
            </Flex>
            {isEditing ? (
                <Textarea
                    value={bio}
                    onChange={onBioChange}
                    placeholder="자기소개를 입력하세요"
                    rows={6}
                    resize="vertical"
                />
            ) : (
                <Text>{bio}</Text>
            )}
        </Box>
    );
};

export default BioSection;
