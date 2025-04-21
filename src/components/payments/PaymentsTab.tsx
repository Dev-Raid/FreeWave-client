'use client';

import React from 'react';
import {Badge, Box, Flex, Heading, Text, VStack} from '@chakra-ui/react';

interface Payment {
    id: number;
    projectTitle: string;
    amount: string;
    date: string;
    status: string;
    type: string;
    recipient: string;
}

interface Estimate {
    id: number;
    projectId: number;
    projectTitle: string;
    freelancerName: string;
    amount: string;
    duration: string;
    message: string;
    status: string;
    createdAt: string;
}

interface PaymentsTabProps {
    payments?: Payment[];
    estimates?: Estimate[];
}

const PaymentsTab: React.FC<PaymentsTabProps> = ({payments = [], estimates = []}) => {
    // 컴포넌트 내용
    return (
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={6}>결제 내역</Heading>
            {payments.length > 0 ? (
                // 결제 내역 표시 로직
                <VStack align="stretch" spacing={4}>
                    {payments.map((payment) => (
                        <Box key={payment.id} p={4} borderWidth="1px" borderRadius="md">
                            <Flex justify="space-between" align="center">
                                <VStack align="start" spacing={1}>
                                    <Heading size="sm">{payment.projectTitle}</Heading>
                                    <Text fontSize="sm" color="gray.600">{payment.date}</Text>
                                </VStack>
                                <VStack align="end" spacing={1}>
                                    <Text fontWeight="bold">{payment.amount}</Text>
                                    <Badge colorScheme={
                                        payment.status === '결제완료' ? 'green' :
                                            payment.status === '정산완료' ? 'blue' :
                                                payment.status === '환불완료' ? 'red' : 'gray'
                                    }>
                                        {payment.status}
                                    </Badge>
                                </VStack>
                            </Flex>
                        </Box>
                    ))}
                </VStack>
            ) : (
                <Text>결제 내역이 없습니다.</Text>
            )}

            {estimates && estimates.length > 0 && (
                <>
                    <Heading size="md" mt={8} mb={6}>견적 내역</Heading>
                    <VStack align="stretch" spacing={4}>
                        {estimates.map((estimate) => (
                            <Box key={estimate.id} p={4} borderWidth="1px" borderRadius="md">
                                <Flex justify="space-between" align="center">
                                    <VStack align="start" spacing={1}>
                                        <Heading size="sm">{estimate.projectTitle}</Heading>
                                        <Text fontSize="sm">{estimate.freelancerName}</Text>
                                        <Text fontSize="sm" color="gray.600">{estimate.createdAt}</Text>
                                    </VStack>
                                    <VStack align="end" spacing={1}>
                                        <Text fontWeight="bold">{estimate.amount}</Text>
                                        <Text fontSize="sm">{estimate.duration}</Text>
                                        <Badge colorScheme={
                                            estimate.status === '수락됨' ? 'green' : 'yellow'
                                        }>
                                            {estimate.status}
                                        </Badge>
                                    </VStack>
                                </Flex>
                            </Box>
                        ))}
                    </VStack>
                </>
            )}
        </Box>
    );
};

export default PaymentsTab;
