import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLeadStore } from '../store/leadStore';
import { 
  calculateTotalScore, 
  qualifyLead 
} from '../utils/leadScoring';
import type { Lead } from '../types/lead';

export function useLeadScoring() {
  const queryClient = useQueryClient();
  const { updateLead } = useLeadStore();
  
  const scoringMutation = useMutation({
    mutationFn: async (lead: Lead) => {
      const totalScore = calculateTotalScore(lead);
      const qualification = qualifyLead(totalScore);
      
      const updatedLead = {
        ...lead,
        totalScore,
        qualification,
        updatedAt: new Date()
      };
      
      return updateLead(lead.id, updatedLead);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });
  
  return {
    scoreLead: scoringMutation.mutate,
    isScoring: scoringMutation.isLoading,
    error: scoringMutation.error
  };
}