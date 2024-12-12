import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import { useTaskQuery } from '../../hooks/useTaskQuery';
import { useTaskMutation } from '../../hooks/useTaskMutation';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import Button from '../common/Button';
import Card from '../common/Card';
import TaskForm from './TaskForm';
import Calendar from './Calendar';
import TaskFilters from './TaskFilters';
import TaskSearchBar from './TaskSearchBar';
import TaskListItem from './TaskListItem';
import TaskEmptyState from './TaskEmptyState';

export default function TaskList() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { 
    filters, 
    updateFilters, 
    clearFilters,
    hasActiveFilters 
  } = useTaskFilters();

  const { data, isLoading } = useTaskQuery({
    ...filters,
    search: searchTerm,
    page: currentPage
  });

  const { createMutation, completeMutation } = useTaskMutation();

  const handleAddTask = async (data: any) => {
    await createMutation.mutateAsync(data);
    setShowAddTask(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowAddTask(true);
  };

  const handleComplete = async (id: string) => {
    await completeMutation.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{ptBR.tasks.title}</h1>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            icon={CalendarIcon}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {ptBR.tasks.calendar}
          </Button>
          <Button icon={Plus} onClick={() => setShowAddTask(true)}>
            {ptBR.tasks.addTask}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className={`space-y-6 ${showCalendar ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {showAddTask ? (
            <Card>
              <TaskForm
                onSubmit={handleAddTask}
                onCancel={() => {
                  setShowAddTask(false);
                  setSelectedDate(null);
                }}
                initialDate={selectedDate}
              />
            </Card>
          ) : (
            <Card>
              <div className="mb-6">
                <TaskSearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  onFilterClick={() => {}}
                />

                <div className="mt-4">
                  <TaskFilters
                    filters={filters}
                    onFilterChange={updateFilters}
                    onClearFilters={clearFilters}
                    hasActiveFilters={hasActiveFilters}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="text-gray-500">{ptBR.common.loading}</div>
                </div>
              ) : data?.tasks.length === 0 ? (
                <TaskEmptyState />
              ) : (
                <div className="space-y-4">
                  {data?.tasks.map((task) => (
                    <TaskListItem
                      key={task.id}
                      task={task}
                      onComplete={handleComplete}
                    />
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {showCalendar && (
          <div className="lg:col-span-1">
            <Calendar onSelectDate={handleDateSelect} />
          </div>
        )}
      </div>
    </div>
  );
}