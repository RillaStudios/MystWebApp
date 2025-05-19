import { LoadingOverlay, Text, Box, Stack } from '@mantine/core';

interface GlobalLoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function GlobalLoadingOverlay({ visible, message }: GlobalLoadingOverlayProps) {

  return (
    <>
      {visible && (
        <Box
          pos="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{ zIndex: 2000 }}
        >
          <LoadingOverlay
            visible={true}
            zIndex={2000}
            overlayProps={{ blur: 3 }}
            loaderProps={{ size: "xl", color: "primary", type: "dots" }}
          />

          {message && (
            <Stack
              align="center"
              justify="center"
              pos="absolute"
              top="60%"
              left={0}
              right={0}
              style={{ zIndex: 2001 }}
            >
              <Text c="white" fw="lighter" fs="normal">{message}</Text>
            </Stack>
          )}
        </Box>
      )}
    </>
  );
}