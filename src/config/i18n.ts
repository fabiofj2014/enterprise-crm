export const ptBR = {
  common: {
    search: 'Pesquisar',
    add: 'Adicionar',
    edit: 'Editar',
    delete: 'Excluir',
    save: 'Salvar',
    cancel: 'Cancelar',
    actions: 'Ações',
    status: 'Status',
    loading: 'Carregando...',
    noData: 'Nenhum dado encontrado',
    filters: 'Filtros'
  },
  navigation: {
    dashboard: 'Painel',
    leads: 'Leads',
    pipeline: 'Pipeline',
    tasks: 'Tarefas',
    analytics: 'Análises',
    documents: 'Documentos',
    messages: 'Mensagens',
    settings: 'Configurações'
  },
  tasks: {
    title: 'Tarefas',
    addTask: 'Nova Tarefa',
    calendar: 'Calendário',
    fields: {
      title: 'Título',
      description: 'Descrição',
      dueDate: 'Data de Vencimento',
      priority: 'Prioridade',
      assignedTo: 'Responsável',
      category: 'Categoria',
      relatedTo: 'Relacionado a',
      notifications: 'Notificações'
    },
    priority: {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta'
    },
    status: {
      pending: 'Pendente',
      in_progress: 'Em Andamento',
      completed: 'Concluída'
    },
    categories: {
      follow_up: 'Follow-up',
      meeting: 'Reunião',
      proposal: 'Proposta',
      document: 'Documento',
      other: 'Outro'
    },
    notifications: {
      types: {
        email: 'E-mail',
        system: 'Sistema'
      },
      schedule: {
        on_date: 'Na data',
        '1_day_before': '1 dia antes',
        '1_hour_before': '1 hora antes'
      }
    },
    filters: {
      title: 'Filtros',
      clearAll: 'Limpar Filtros',
      dateRange: 'Período',
      status: 'Status',
      priority: 'Prioridade',
      category: 'Categoria'
    }
  },
  leads: {
    title: 'Leads',
    addLead: 'Novo Lead',
    name: 'Nome',
    company: 'Empresa',
    email: 'E-mail',
    phone: 'Telefone',
    service: 'Serviço',
    servicePlaceholder: 'Ex: Planejamento Previdenciário, Regularização de Imóveis...',
    score: 'Pontuação',
    status: {
      new: 'Novo',
      contacted: 'Contatado',
      qualified: 'Qualificado',
      proposal: 'Proposta',
      negotiation: 'Negociação',
      won: 'Ganho',
      lost: 'Perdido'
    }
  },
  pipeline: {
    title: 'Pipeline de Vendas',
    addDeal: 'Nova Oportunidade',
    deal: {
      title: 'Título',
      value: 'Valor',
      probability: 'Probabilidade',
      expectedCloseDate: 'Data Prevista',
      assignedTo: 'Responsável'
    }
  },
  analytics: {
    title: 'Análises',
    exportReport: 'Exportar Relatório',
    timeRanges: {
      today: 'Hoje',
      yesterday: 'Ontem',
      last7days: 'Últimos 7 dias',
      last30days: 'Últimos 30 dias',
      thisMonth: 'Este mês',
      lastMonth: 'Mês passado',
      thisYear: 'Este ano'
    },
    metrics: {
      totalLeads: 'Total de Leads',
      qualifiedLeads: 'Leads Qualificados',
      totalRevenue: 'Receita Total',
      conversionRate: 'Taxa de Conversão'
    },
    sections: {
      salesOverview: 'Visão Geral de Vendas',
      leadSources: 'Origem dos Leads',
      conversionRates: 'Taxas de Conversão',
      teamPerformance: 'Desempenho da Equipe',
      charts: {
        salesChart: 'Gráfico de vendas será exibido aqui',
        leadSourcesChart: 'Distribuição de origem dos leads',
        conversionChart: 'Tendências de taxa de conversão',
        performanceChart: 'Métricas de desempenho da equipe'
      }
    }
  },
  documents: {
    title: 'Documentos',
    upload: 'Upload de Documento',
    search: 'Pesquisar documentos...',
    columns: {
      name: 'Nome',
      size: 'Tamanho',
      lastModified: 'Última Modificação',
      actions: 'Ações'
    }
  }
};