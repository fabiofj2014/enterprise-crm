import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../types';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

export default function Calendar({ onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const { tasks } = useTaskStore();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-gray-900">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <div className="flex space-x-1">
          <button
            onClick={previousMonth}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px mb-1">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-50">
        {days.map(day => {
          const dayTasks = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);

          return (
            <button
              key={day.toString()}
              onClick={() => onSelectDate(day)}
              className={`
                relative p-1 h-16 text-sm
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${isCurrentDay ? 'font-bold text-indigo-600' : ''}
                hover:bg-gray-50 transition-colors
              `}
            >
              <time
                dateTime={format(day, 'yyyy-MM-dd')}
                className={`block w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center
                  ${isCurrentDay ? 'bg-indigo-600 text-white' : ''}
                `}
              >
                {format(day, 'd')}
              </time>
              {dayTasks.length > 0 && (
                <div className="absolute bottom-1 inset-x-1">
                  <div className="h-1 rounded-full bg-indigo-600 opacity-75" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}