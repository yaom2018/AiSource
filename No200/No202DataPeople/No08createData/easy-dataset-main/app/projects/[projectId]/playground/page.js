'use client';

import React from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { useParams } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import ChatArea from '@/components/playground/ChatArea';
import MessageInput from '@/components/playground/MessageInput';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import useModelPlayground from '@/hooks/useModelPlayground';
import { playgroundStyles } from '@/styles/playground';
import { useTranslation } from 'react-i18next';

export default function ModelPlayground() {
  const theme = useTheme();
  const params = useParams();
  const { projectId } = params;
  const styles = playgroundStyles(theme);
  const { t } = useTranslation();

  const {
    availableModels,
    selectedModels,
    loading,
    userInput,
    conversations,
    error,
    outputMode,
    handleModelSelection,
    handleInputChange,
    handleSendMessage,
    handleClearConversations,
    handleOutputModeChange,
    getModelName
  } = useModelPlayground(projectId);

  return (
    <Box sx={styles.container}>
      <Typography variant="h5" component="h1" gutterBottom>
        {t('playground.title')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={styles.mainPaper}>
        <PlaygroundHeader
          availableModels={availableModels}
          selectedModels={selectedModels}
          handleModelSelection={handleModelSelection}
          handleClearConversations={handleClearConversations}
          conversations={conversations}
          outputMode={outputMode}
          handleOutputModeChange={handleOutputModeChange}
        />

        <ChatArea
          selectedModels={selectedModels}
          conversations={conversations}
          loading={loading}
          getModelName={getModelName}
        />

        <MessageInput
          userInput={userInput}
          handleInputChange={handleInputChange}
          handleSendMessage={handleSendMessage}
          loading={loading}
          selectedModels={selectedModels}
        />
      </Paper>
    </Box>
  );
}
