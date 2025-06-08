'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  LinearProgress,
  Container,
  Paper,
  Chip,
  Grid,
} from '@mui/material';
import { CheckCircle, Cancel, Quiz } from '@mui/icons-material';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Gitでファイルを追跡対象に追加するコマンドは？',
    options: ['git add', 'git commit', 'git push', 'git pull'],
    correctAnswer: 0,
    explanation: 'git addコマンドでファイルをステージングエリアに追加します。'
  },
  {
    id: 2,
    question: 'コミットメッセージを含めてコミットするコマンドは？',
    options: ['git commit', 'git commit -m "message"', 'git add -m "message"', 'git push -m "message"'],
    correctAnswer: 1,
    explanation: 'git commit -m "メッセージ"でコミットメッセージを含めてコミットできます。'
  },
  {
    id: 3,
    question: 'リモートリポジトリからローカルにコードを取得するコマンドは？',
    options: ['git push', 'git pull', 'git commit', 'git status'],
    correctAnswer: 1,
    explanation: 'git pullコマンドでリモートリポジトリの変更をローカルに取得します。'
  },
  {
    id: 4,
    question: '新しいブランチを作成して切り替えるコマンドは？',
    options: ['git branch new-branch', 'git checkout new-branch', 'git checkout -b new-branch', 'git switch new-branch'],
    correctAnswer: 2,
    explanation: 'git checkout -bコマンドで新しいブランチを作成して同時に切り替えます。'
  },
  {
    id: 5,
    question: 'ワーキングディレクトリの状態を確認するコマンドは？',
    options: ['git log', 'git status', 'git diff', 'git show'],
    correctAnswer: 1,
    explanation: 'git statusコマンドでワーキングディレクトリの状態を確認できます。'
  },
  {
    id: 6,
    question: 'コミット履歴を表示するコマンドは？',
    options: ['git status', 'git log', 'git diff', 'git show'],
    correctAnswer: 1,
    explanation: 'git logコマンドでコミット履歴を表示できます。'
  },
  {
    id: 7,
    question: 'ローカルの変更をリモートリポジトリに送信するコマンドは？',
    options: ['git pull', 'git push', 'git commit', 'git merge'],
    correctAnswer: 1,
    explanation: 'git pushコマンドでローカルの変更をリモートリポジトリに送信します。'
  },
  {
    id: 8,
    question: 'ブランチをマージするコマンドは？',
    options: ['git merge', 'git rebase', 'git checkout', 'git branch'],
    correctAnswer: 0,
    explanation: 'git mergeコマンドで他のブランチを現在のブランチにマージします。'
  }
];

export default function GitQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizData.length).fill(false));
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem('gitQuizScore');
    const savedProgress = localStorage.getItem('gitQuizProgress');
    
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
    if (savedProgress) {
      setAnsweredQuestions(JSON.parse(savedProgress));
    }
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer;
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem('gitQuizScore', newScore.toString());
    }

    setAnsweredQuestions(newAnsweredQuestions);
    localStorage.setItem('gitQuizProgress', JSON.stringify(newAnsweredQuestions));
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizData.length).fill(false));
    setQuizCompleted(false);
    localStorage.removeItem('gitQuizScore');
    localStorage.removeItem('gitQuizProgress');
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / quizData.length) * 100;

  if (quizCompleted) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Quiz sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            クイズ完了！
          </Typography>
          <Typography variant="h6" gutterBottom>
            あなたのスコア: {score} / {quizData.length}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            正答率: {Math.round((score / quizData.length) * 100)}%
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={resetQuiz}
            sx={{ mt: 2 }}
          >
            もう一度挑戦する
          </Button>
        </Paper>
      </Container>
    );
  }

  const currentQ = quizData[currentQuestion];

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          Gitクイズ
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2">
            問題 {currentQuestion + 1} / {quizData.length}
          </Typography>
          <Chip
            label={`スコア: ${score}`}
            color="primary"
            variant="outlined"
          />
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      </Box>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            {currentQ.question}
          </Typography>

          {!showResult ? (
            <>
              <RadioGroup
                value={selectedAnswer}
                onChange={(e) => handleAnswerSelect(parseInt(e.target.value))}
              >
                <Grid container spacing={1}>
                  {currentQ.options.map((option, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <FormControlLabel
                        value={index}
                        control={<Radio />}
                        label={option}
                        sx={{
                          border: '1px solid #e0e0e0',
                          borderRadius: 1,
                          margin: 0,
                          padding: 1,
                          width: '100%',
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          }
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  size="large"
                >
                  回答する
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Alert
                severity={selectedAnswer === currentQ.correctAnswer ? 'success' : 'error'}
                icon={selectedAnswer === currentQ.correctAnswer ? <CheckCircle /> : <Cancel />}
                sx={{ mb: 2 }}
              >
                {selectedAnswer === currentQ.correctAnswer ? '正解です！' : '不正解です。'}
              </Alert>

              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>正解:</strong> {currentQ.options[currentQ.correctAnswer]}
              </Typography>

              {currentQ.explanation && (
                <Typography variant="body2" sx={{ mb: 3, fontStyle: 'italic' }}>
                  {currentQ.explanation}
                </Typography>
              )}

              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                  size="large"
                >
                  {currentQuestion < quizData.length - 1 ? '次の問題' : '結果を見る'}
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}