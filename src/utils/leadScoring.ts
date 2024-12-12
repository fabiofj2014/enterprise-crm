import { LeadScore, Lead, LeadActivity } from '../types/lead';

export function calculateEngagementScore(activities: LeadActivity[]): number {
  let score = 0;
  
  // Email engagement
  const emailActivities = activities.filter(a => a.type === 'email');
  const emailOpenRate = emailActivities.filter(a => a.metadata?.emailOpened).length / emailActivities.length;
  const emailClickRate = emailActivities.filter(a => a.metadata?.emailClicked).length / emailActivities.length;
  
  score += emailOpenRate * 10;
  score += emailClickRate * 15;
  
  // Website behavior
  const websiteVisits = activities.filter(a => a.type === 'website').length;
  score += Math.min(websiteVisits, 5);
  
  return Math.min(score, 30);
}

export function calculateInteractionsScore(activities: LeadActivity[]): number {
  let score = 0;
  
  // Direct interactions
  const meetings = activities.filter(a => a.type === 'meeting').length;
  const calls = activities.filter(a => a.type === 'call').length;
  
  score += meetings * 8;
  score += calls * 5;
  
  // Form submissions
  const forms = activities.filter(a => a.type === 'form' && a.metadata?.formCompleted).length;
  score += forms * 4;
  
  return Math.min(score, 25);
}

export function calculateDemographicsScore(lead: Lead): number {
  let score = 0;
  
  // Company size (from custom fields)
  const companySize = lead.customFields.companySize;
  if (companySize > 1000) score += 10;
  else if (companySize > 100) score += 7;
  else if (companySize > 10) score += 5;
  
  // Industry match
  const targetIndustries = ['technology', 'healthcare', 'finance'];
  if (targetIndustries.includes(lead.customFields.industry)) {
    score += 10;
  }
  
  return Math.min(score, 20);
}

export function calculateBehaviorScore(activities: LeadActivity[]): number {
  let score = 0;
  
  // Recency of interactions
  const lastInteraction = new Date(Math.max(...activities.map(a => a.createdAt.getTime())));
  const daysSinceLastInteraction = Math.floor((Date.now() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceLastInteraction < 7) score += 8;
  else if (daysSinceLastInteraction < 30) score += 5;
  else if (daysSinceLastInteraction < 90) score += 2;
  
  // Frequency of interactions
  const interactionsLast30Days = activities.filter(a => {
    const days = (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return days <= 30;
  }).length;
  
  score += Math.min(interactionsLast30Days * 2, 7);
  
  return Math.min(score, 15);
}

export function calculateBudgetScore(lead: Lead): number {
  const budget = lead.customFields.budget;
  
  if (!budget) return 0;
  
  if (budget >= 100000) return 10;
  if (budget >= 50000) return 8;
  if (budget >= 25000) return 6;
  if (budget >= 10000) return 4;
  return 2;
}

export function calculateTotalScore(lead: Lead): number {
  const scores = {
    engagement: calculateEngagementScore(lead.activities),
    interactions: calculateInteractionsScore(lead.activities),
    demographics: calculateDemographicsScore(lead),
    behavior: calculateBehaviorScore(lead.activities),
    budget: calculateBudgetScore(lead)
  };
  
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}

export function qualifyLead(totalScore: number): Lead['qualification'] {
  if (totalScore >= 75) return 'hot';
  if (totalScore >= 40) return 'warm';
  return 'cold';
}