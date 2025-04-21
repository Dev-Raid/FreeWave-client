'use client';

import {ChakraProvider} from '@chakra-ui/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from '@/contexts/AuthContext';
import {ProfileProvider} from '@/contexts/ProfileContext';
import PersistLogin from '@/components/auth/PersistLogin';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
        <body>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <AuthProvider>
                    <ProfileProvider>
                        <PersistLogin>
                            {children}
                        </PersistLogin>
                    </ProfileProvider>
                </AuthProvider>
            </ChakraProvider>
        </QueryClientProvider>
        </body>
        </html>
    );
}
