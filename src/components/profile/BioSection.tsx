'use client';

import React, {useState, useEffect} from 'react';
import {Box, Button, Flex, Heading, Text, Textarea, useToast} from '@chakra-ui/react';
import {FaEdit, FaCheck} from 'react-icons/fa';
import {useProfile} from '@/contexts/ProfileContext';

interface BioSectionProps {
    bio: string;
    onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BioSection: React.FC<BioSectionProps> = ({bio, onBioChange}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [localBio, setLocalBio] = useState<string>(bio || '');
    const toast = useToast();
    const {updateBio, isLoading} = useProfile();

    // bio prop이 변경될 때 localBio 상태 업데이트
    useEffect(() => {
        setLocalBio(bio || '');
    }, [bio]);

    const handleLocalBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalBio(e.target.value);
    };

    const handleSave = async () => {
        try {
            // API를 통해 자기소개 업데이트
            await updateBio(localBio);

            // 부모 컴포넌트의 상태도 업데이트
            const syntheticEvent = {
                target: {
                    value: localBio
                }
            } as React.ChangeEvent<HTMLTextAreaElement>;
            onBioChange(syntheticEvent);

            setIsEditing(false);

            toast({
                title: '자기소개가 저장되었습니다.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('자기소개 저장 오류:', error);
            toast({
                title: '자기소개 저장에 실패했습니다.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
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
                    isLoading={isLoading}
                >
                    {isEditing ? '저장' : '수정'}
                </Button>
            </Flex>
            {isEditing ? (
                <Textarea
                    value={localBio}
                    onChange={handleLocalBioChange}
                    placeholder="자기소개를 입력하세요"
                    rows={6}
                    resize="vertical"
                />
            ) : (
                <Text whiteSpace="pre-wrap">
                    {localBio || '자기소개가 없습니다. 자신을 소개해보세요!'}
                </Text>
            )}
        </Box>
    );
};

export default BioSection;
