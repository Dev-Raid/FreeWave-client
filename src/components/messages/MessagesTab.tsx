'use client';

import React from 'react';
import {Flex, Box, Heading, VStack, Avatar, Text, Input, Button, IconButton, Divider, HStack} from '@chakra-ui/react';
import {FaPlus} from 'react-icons/fa';

interface Message {
    id: number;
    sender: string;
    avatar: string;
    projectTitle: string;
    lastMessage: string;
    unread: number;
    timestamp: string;
}

interface MessagesTabProps {
    messages: Message[];
}

const MessagesTab: React.FC<MessagesTabProps> = ({messages}) => {
    return (
        <Flex direction={{base: 'column', md: 'row'}} gap={6}>
            {/* 채팅 목록 */}
            <Box
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                width={{base: '100%', md: '350px'}}
                height={{base: 'auto', md: '600px'}}
                overflow="hidden"
            >
                <Box p={4} borderBottomWidth="1px">
                    <Heading size="md">메시지</Heading>
                </Box>

                <VStack align="stretch" spacing={0} overflowY="auto" maxH="540px">
                    {messages.map((chat) => (
                        <Box
                            key={chat.id}
                            p={4}
                            borderBottomWidth="1px"
                            cursor="pointer"
                            _hover={{bg: "gray.50"}}
                            bg={chat.id === 1 ? "blue.50" : "transparent"}
                        >
                            <Flex>
                                <Avatar size="md" name={chat.sender} src={chat.avatar}/>
                                <Box ml={3} flex={1}>
                                    <Flex justify="space-between" align="baseline">
                                        <Text fontWeight="bold">{chat.sender}</Text>
                                        <Text fontSize="xs" color="gray.500">{chat.timestamp}</Text>
                                    </Flex>
                                    <Text fontSize="sm" color="gray.700" noOfLines={1}>{chat.projectTitle}</Text>
                                    <Text fontSize="sm" noOfLines={1}>{chat.lastMessage}</Text>
                                </Box>
                                {chat.unread > 0 && (
                                    <Box
                                        bg="red.500"
                                        color="white"
                                        borderRadius="full"
                                        minW="20px"
                                        height="20px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontSize="xs"
                                        fontWeight="bold"
                                        alignSelf="center"
                                    >
                                        {chat.unread}
                                    </Box>
                                )}
                            </Flex>
                        </Box>
                    ))}
                </VStack>
            </Box>

            {/* 채팅 창 */}
            <Box
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                flex={1}
                height={{base: 'auto', md: '600px'}}
                position="relative"
                display={{base: 'none', md: 'block'}}
            >
                <Box p={4} borderBottomWidth="1px">
                    <Flex justify="space-between" align="center">
                        <HStack>
                            <Avatar size="sm" name="김디자이너" src="https://i.pravatar.cc/150?u=김디자이너"/>
                            <Box>
                                <Text fontWeight="bold">김디자이너</Text>
                                <Text fontSize="xs" color="gray.500">모바일 앱 UI/UX 디자인</Text>
                            </Box>
                        </HStack>
                    </Flex>
                </Box>

                {/* 채팅 메시지 영역 */}
                <Box p={4} height="440px" overflowY="auto">
                    <VStack align="stretch" spacing={4}>
                        {/* 날짜 구분선 */}
                        <Flex align="center" justify="center" my={4}>
                            <Divider flex={1}/>
                            <Text mx={2} fontSize="xs" color="gray.500">2025년 4월 18일</Text>
                            <Divider flex={1}/>
                        </Flex>

                        {/* 상대방 메시지 */}
                        <Flex>
                            <Avatar size="sm" name="김디자이너" src="https://i.pravatar.cc/150?u=김디자이너"/>
                            <Box ml={2} maxW="70%">
                                <Box bg="gray.100" p={3} borderRadius="lg">
                                    <Text>안녕하세요! 수정된 디자인 시안을 보내드립니다. 피드백 부탁드립니다.</Text>
                                </Box>
                                <Text fontSize="xs" color="gray.500" mt={1}>오후 2:30</Text>
                            </Box>
                        </Flex>

                        {/* 내 메시지 */}
                        <Flex justify="flex-end">
                            <Box mr={2} maxW="70%" textAlign="right">
                                <Box bg="blue.500" p={3} borderRadius="lg" color="white">
                                    <Text>감사합니다! 확인해보고 피드백 드리겠습니다.</Text>
                                </Box>
                                <Text fontSize="xs" color="gray.500" mt={1}>오후 3:15</Text>
                            </Box>
                        </Flex>
                    </VStack>
                </Box>

                {/* 메시지 입력 영역 */}
                <Box p={4} borderTopWidth="1px" position="absolute" bottom={0} width="100%">
                    <Flex>
                        <IconButton
                            icon={<FaPlus/>}
                            aria-label="Add attachment"
                            variant="ghost"
                            mr={2}
                        />
                        <Input placeholder="메시지를 입력하세요..." mr={2}/>
                        <Button colorScheme="blue">보내기</Button>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
};

export default MessagesTab;
