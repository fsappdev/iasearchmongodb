import React, { useState } from 'react';
import { AppShell, Container, Title, Text, Group, Box, ActionIcon, Menu, MantineProvider, createTheme, useMantineColorScheme, Paper } from '@mantine/core';
import { IconDatabase, IconSun, IconMoon, IconPalette } from '@tabler/icons-react';
import QueryInterface from './components/QueryInterface';
import ResponseDisplay from './components/ResponseDisplay';

function MainLayout() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [response, setResponse] = useState(null);

    return (
        <AppShell header={{ height: 64 }} padding="md">
            <AppShell.Header>
                <Container size="lg" h="100%">
                    <Group h="100%" justify="space-between" align="center">
                        <Group gap="sm">
                            <Box
                                style={{
                                    background: 'linear-gradient(135deg, #4c6ef5, #7c3aed)',
                                    borderRadius: 8,
                                    padding: '6px 8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <IconDatabase size={20} color="white" />
                            </Box>
                            <div>
                                <Title order={4} style={{ lineHeight: 1.2 }}>QueryAI</Title>
                                <Text size="xs" c="dimmed">Consultas inteligentes a MongoDB</Text>
                            </div>
                        </Group>
                        <Group gap="sm">
                            <ActionIcon
                                variant="default"
                                size="lg"
                                radius="md"
                                onClick={() => toggleColorScheme()}
                            >
                                {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
                            </ActionIcon>
                            <Menu trigger="hover" position="bottom-end">
                                <Menu.Target>
                                    <ActionIcon variant="default" size="lg" radius="md">
                                        <IconPalette size={18} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>Tema de Color</Menu.Label>
                                    <Menu.Item
                                        leftSection={<Box w={16} h={16} style={{ borderRadius: '50%', backgroundColor: 'var(--mantine-color-indigo-6)' }} />}
                                        onClick={() => window.dispatchEvent(new CustomEvent('change-theme', { detail: 'indigo' }))}
                                    >
                                        Indigo
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<Box w={16} h={16} style={{ borderRadius: '50%', backgroundColor: 'var(--mantine-color-teal-6)' }} />}
                                        onClick={() => window.dispatchEvent(new CustomEvent('change-theme', { detail: 'teal' }))}
                                    >
                                        Teal
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={<Box w={16} h={16} style={{ borderRadius: '50%', backgroundColor: 'var(--mantine-color-blue-6)' }} />}
                                        onClick={() => window.dispatchEvent(new CustomEvent('change-theme', { detail: 'blue' }))}
                                    >
                                        Blue
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>
                </Container>
            </AppShell.Header>

            <AppShell.Main>
                <Container size="lg" py="xl">
                    <Paper shadow="lg" p="sm" mb="lg" withBorder>
                        <Box mb="xl" ta="center">
                            <Title order={2} mb="xs">Consulta tu Base de Datos</Title>
                            <Text c="dimmed" size="sm">
                                Escribe en lenguaje natural y obtén resultados al instante
                            </Text>
                        </Box>
                    </Paper>
                    <QueryInterface onResponse={setResponse} />
                    <ResponseDisplay response={response} />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}

function App() {
    const [primaryColor, setPrimaryColor] = useState('indigo');

    React.useEffect(() => {
        const handleThemeChange = (e) => setPrimaryColor(e.detail);
        window.addEventListener('change-theme', handleThemeChange);
        return () => window.removeEventListener('change-theme', handleThemeChange);
    }, []);

    const theme = createTheme({
        primaryColor,
        fontFamily: 'Inter, sans-serif',
        defaultRadius: 'md',
    });

    return (
        <MantineProvider theme={theme} defaultColorScheme="light">
            <MainLayout />
        </MantineProvider>
    );
}

export default App;