'use client';

import React, {useState, useRef} from 'react';
import {
    Box, Input, InputGroup, InputRightElement, Icon, Flex, Text,
    Checkbox, Button, Tag, IconButton, VStack, Divider,
    useOutsideClick, HStack
} from '@chakra-ui/react';
import {FaSearch, FaTrash} from 'react-icons/fa';

// 타입 정의
interface SkillSelectorProps {
    selectedSkills: string[];
    onSkillsChange: (skills: string[]) => void;
}

// 백엔드에서 가져온 기술 목록 예시 (enum 타입)
const predefinedSkills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Node.js",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "UI/UX",
    "Figma",
    "HTML",
    "CSS",
    "SASS",
    "Redux",
    "GraphQL",
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Firebase",
    "Git",
    "REST API",
    "Express.js",
    "Vue.js",
    "Angular",
    "Swift",
    "Kotlin",
    "Flutter",
    "React Native"
];

const SkillSelector: React.FC<SkillSelectorProps> = ({selectedSkills, onSkillsChange}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [customSkill, setCustomSkill] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지
    useOutsideClick({
        ref: dropdownRef as React.RefObject<HTMLElement>,
        handler: () => {
            if (isOpen) setIsOpen(false);
        },
    });

    // 검색어에 따라 필터링된 기술 목록
    const filteredSkills: string[] = searchTerm.trim() === ''
        ? predefinedSkills
        : predefinedSkills.filter(skill =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // 기술 선택 토글
    const handleSkillToggle = (skill: string): void => {
        if (selectedSkills.includes(skill)) {
            onSkillsChange(selectedSkills.filter(s => s !== skill));
        } else {
            onSkillsChange([...selectedSkills, skill]);
        }
        // 토글 후에도 입력 필드에 포커스 유지
        inputRef.current?.focus();
    };

    // 커스텀 기술 추가
    const handleAddCustomSkill = (): void => {
        if (customSkill.trim() !== '' && !selectedSkills.includes(customSkill.trim()) && !predefinedSkills.includes(customSkill.trim())) {
            onSkillsChange([...selectedSkills, customSkill.trim()]);
            setCustomSkill('');
        }
    };

    // 입력 변경 핸들러
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
        if (!isOpen) setIsOpen(true);
    };

    // 커스텀 기술 입력 변경 핸들러
    const handleCustomSkillChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCustomSkill(e.target.value);
    };

    // 커스텀 기술 키 입력 핸들러
    const handleCustomSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomSkill();
        }
    };

    // 검색 입력 필드 포커스 핸들러
    const handleInputFocus = (): void => {
        setIsOpen(true);
    };

    // 검색 결과에서 새 기술 추가
    const handleAddSearchTerm = (): void => {
        if (searchTerm.trim() !== '') {
            onSkillsChange([...selectedSkills, searchTerm.trim()]);
            setSearchTerm('');
            inputRef.current?.focus();
        }
    };

    // 키보드 이벤트 처리
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <Box position="relative" ref={dropdownRef}>
            <InputGroup>
                <Input
                    ref={inputRef}
                    placeholder="기술을 검색하세요"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                />
                <InputRightElement>
                    <Icon as={FaSearch} color="gray.500"/>
                </InputRightElement>
            </InputGroup>

            {isOpen && (
                <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    mt={2}
                    bg="white"
                    borderRadius="md"
                    boxShadow="md"
                    maxH="300px"
                    overflowY="auto"
                    zIndex={10}
                    border="1px solid"
                    borderColor="gray.200"
                >
                    <VStack align="stretch" spacing={0} divider={<Divider/>}>
                        {filteredSkills.length > 0 ? (
                            filteredSkills.map((skill) => (
                                <Flex
                                    key={skill}
                                    p={2}
                                    align="center"
                                    _hover={{bg: "gray.50"}}
                                    cursor="pointer"
                                    onClick={() => handleSkillToggle(skill)}
                                >
                                    <Checkbox
                                        isChecked={selectedSkills.includes(skill)}
                                        mr={2}
                                        onChange={() => {
                                        }}
                                    />
                                    <Text>{skill}</Text>
                                </Flex>
                            ))
                        ) : (
                            <Box p={2}>
                                <Text>검색 결과가 없습니다.</Text>
                                {searchTerm.trim() !== '' && (
                                    <Button
                                        size="sm"
                                        mt={2}
                                        colorScheme="blue"
                                        onClick={handleAddSearchTerm}
                                    >
                                        {`"${searchTerm}" 추가하기`}
                                    </Button>
                                )}
                            </Box>
                        )}
                    </VStack>
                </Box>
            )}

            {/* 커스텀 기술 입력 */}
            <HStack mt={4}>
                <Input
                    placeholder="목록에 없는 기술 직접 입력"
                    value={customSkill}
                    onChange={handleCustomSkillChange}
                    onKeyPress={handleCustomSkillKeyPress}
                />
                <Button colorScheme="blue" onClick={handleAddCustomSkill}>추가</Button>
            </HStack>

            {/* 선택된 기술 표시 */}
            <Flex flexWrap="wrap" gap={2} mt={4}>
                {selectedSkills.map((skill, index) => (
                    <Tag
                        key={index}
                        colorScheme="blue"
                        size="lg"
                        borderRadius="full"
                    >
                        <Box px={1}>{skill}</Box>
                        <IconButton
                            icon={<FaTrash/>}
                            size="xs"
                            colorScheme="blue"
                            variant="ghost"
                            ml={1}
                            onClick={() => handleSkillToggle(skill)}
                            aria-label={`Remove ${skill}`}
                        />
                    </Tag>
                ))}
            </Flex>
        </Box>
    );
};

export default SkillSelector;
