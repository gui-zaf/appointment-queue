import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface Patient {
  name: string;
  age: number;
  password: string;
  specialty: string;
  priority: 'normal' | 'priority';
  roomNumber: number;
}

interface QueueItem {
  patient: Patient;
  isCalled: boolean;
}

interface QueueContextData {
  queue: QueueItem[];
  history: QueueItem[];
  isQueueActive: boolean;
  startQueue: () => void;
  stopQueue: () => void;
  addToQueue: (patient: Patient) => void;
  callNext: () => void;
  updateQueue: (newQueue: QueueItem[]) => void;
}

const QueueContext = createContext<QueueContextData>({} as QueueContextData);

const PRIORITY_TIMER = 5000; // 5 segundos para senhas prioritárias
const NORMAL_TIMER = 10000; // 10 segundos para senhas normais
const CURRENT_TIMER = 10000; // 10 segundos para senha atual

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [history, setHistory] = useState<QueueItem[]>([]);
  const [isQueueActive, setIsQueueActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startQueue = () => {
    setIsQueueActive(true);
  };

  const stopQueue = () => {
    setIsQueueActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Função para ordenar a fila por prioridade
  const sortQueue = (items: QueueItem[]) => {
    return [...items].sort((a, b) => {
      // Se ambos têm a mesma prioridade, mantém a ordem de chegada
      if (a.patient.priority === b.patient.priority) {
        return 0;
      }
      // Prioridade vem primeiro
      return a.patient.priority === 'priority' ? -1 : 1;
    });
  };

  const addToQueue = (patient: Patient) => {
    setQueue(prev => {
      const newQueue = [...prev, { patient, isCalled: false }];
      return sortQueue(newQueue);
    });
  };

  const moveToHistory = (item: QueueItem) => {
    setHistory(prev => [...prev, item]);
  };

  const processNextInQueue = () => {
    setQueue(prev => {
      // Remove a senha atual da fila
      const remainingQueue = prev.filter(item => !item.isCalled);
      
      // Se não houver mais senhas, retorna a fila vazia
      if (remainingQueue.length === 0) {
        return [];
      }

      // Pega a próxima senha (já ordenada por prioridade)
      const nextItem = remainingQueue[0];
      
      // Marca a próxima senha como chamada
      return remainingQueue.map(item => 
        item.patient.password === nextItem.patient.password
          ? { ...item, isCalled: true }
          : item
      );
    });
  };

  // Efeito para gerenciar o timer da senha atual
  useEffect(() => {
    if (!isQueueActive) return;

    const currentPassword = queue.find(item => item.isCalled);
    
    if (currentPassword) {
      // Limpa o timer anterior se existir
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Configura o timer para mover a senha atual para o histórico
      timerRef.current = setTimeout(() => {
        setQueue(prev => {
          const currentItem = prev.find(item => item.isCalled);
          if (currentItem) {
            moveToHistory(currentItem);
          }
          return prev.filter(item => !item.isCalled);
        });
      }, CURRENT_TIMER);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [queue, isQueueActive]);

  // Efeito para gerenciar o timer de chamada da próxima senha
  useEffect(() => {
    if (!isQueueActive) return;

    const currentPassword = queue.find(item => item.isCalled);
    const nextPassword = queue.find(item => !item.isCalled);

    if (!currentPassword && nextPassword) {
      // Limpa o timer anterior se existir
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Configura o timer para chamar a próxima senha
      const timer = nextPassword.patient.priority === 'priority' ? PRIORITY_TIMER : NORMAL_TIMER;
      
      timerRef.current = setTimeout(() => {
        processNextInQueue();
      }, timer);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [queue, isQueueActive]);

  const updateQueue = (newQueue: QueueItem[]) => {
    setQueue(sortQueue(newQueue));
  };

  return (
    <QueueContext.Provider value={{ 
      queue, 
      history, 
      isQueueActive,
      startQueue,
      stopQueue,
      addToQueue, 
      callNext: processNextInQueue, 
      updateQueue 
    }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);

  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }

  return context;
}; 