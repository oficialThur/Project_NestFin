export const DASHBOARD_TABS = [
  { label: 'Patrimônio líquido', value: 'patrimonio' },
  { label: 'Conta corrente', value: 'conta' },
  { label: 'Poupança', value: 'poupanca' },
] as const;

export type DashboardTab = typeof DASHBOARD_TABS[number]['value'];

export const DASHBOARD_CONFIG: Record<DashboardTab, {
  title: string;
  subtitle: string;
  chartLabel: string;
  period: string;
  growth: string;
}> = {
  patrimonio: {
    title: 'Patrimônio líquido',
    subtitle: 'Valor total dos seus ativos',
    chartLabel: 'Patrimônio líquido',
    period: 'Últimos 6 meses',
    growth: '+12%',
  },
  conta: {
    title: 'Conta corrente',
    subtitle: 'Saldo disponível na conta',
    chartLabel: 'Equilíbrio ao longo do tempo',
    period: 'Últimos 30 dias',
    growth: '+2.5%',
  },
  poupanca: {
    title: 'Poupança',
    subtitle: 'Valor total da poupança',
    chartLabel: 'Poupança ao Longo do Tempo',
    period: 'Últimos 30 dias',
    growth: '+5%',
  },
};

// Mock data para gráficos
export const CHART_DATA = {
  patrimonio: [
    { name: 'Jan', value: 9000 },
    { name: 'Fev', value: 12000 },
    { name: 'Mar', value: 9500 },
    { name: 'Abr', value: 11000 },
    { name: 'Mai', value: 13000 },
    { name: 'Jun', value: 12345 },
  ],
  conta: [
    { name: 'Jul 1', value: 8000 },
    { name: 'Jul 8', value: 9000 },
    { name: 'Jul 15', value: 8500 },
    { name: 'Jul 22', value: 11000 },
    { name: 'Jul 29', value: 12345.67 },
  ],
  poupanca: [
    { name: 'Jul 1', value: 4000 },
    { name: 'Jul 8', value: 9000 },
    { name: 'Jul 15', value: 5000 },
    { name: 'Jul 22', value: 11000 },
    { name: 'Jul 29', value: 12345.67 },
  ],
};

export const THEME = {
  colors: {
    background: '#122112',
    cardBg: '#2B402B',
    cardBgDark: '#1a2d1a',
    border: '#4A5D4A',
    borderLight: '#264526',
    textPrimary: '#ffffff',
    textSecondary: '#9EBF9E',
    textMuted: '#E5E8EB',
    accent: '#c6ffe9',
    accentGreen: '#22c55e',
  },
};
