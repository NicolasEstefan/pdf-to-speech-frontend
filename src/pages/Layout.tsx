import { Box, Drawer, Group, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import GenerationsList from '../components/generations-list/GenerationsList'
import { IconLayoutSidebarFilled } from '@tabler/icons-react'
import SignInWithGoogleButton from '../components/SignInWithGoogleButton'

export default function Layout() {
  const [opened, { toggle, close }] = useDisclosure(false)

  return (
    <Box h="100vh" style={{ display: 'flex' }} bg="brand.0">
      <Drawer
        opened={opened}
        onClose={close}
        size="85%"
        withCloseButton={false}
        styles={{ body: { height: '100%', padding: 'var(--mantine-spacing-md)' } }}
      >
        <GenerationsList />
      </Drawer>

      <Box w={{ md: '35%', lg: '25%' }} h="100%" p="md" visibleFrom="md">
        <GenerationsList />
      </Box>

      <Box
        flex={1}
        h="100%"
        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Group justify="space-between" px="md" py="sm">
          <ActionIcon
            variant="subtle"
            size="xl"
            radius="xl"
            hiddenFrom="md"
            onClick={toggle}
            color="brand"
          >
            <IconLayoutSidebarFilled size={25} />
          </ActionIcon>
          <Box ml="auto">
            <SignInWithGoogleButton />
          </Box>
        </Group>
        <Box flex={1} style={{ overflow: 'hidden' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
