<template>
  <div class="bg-white p-6 w-full max-w-sm">
    <h3 class="text-lg font-bold text-gray-700 mb-4 text-center">Resumen de Presupuesto</h3>
    
    <div class="flex justify-center mb-4">
      <div class="relative w-48 h-48">
        <svg viewBox="0 0 100 100" class="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            stroke-width="10"
          />
          <circle
            v-if="budget > 0"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            :stroke="getProgressColor"
            stroke-width="10"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="calculateOffset"
            transform="rotate(-90 50 50)"
          />
        </svg>

        <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div class="text-3xl font-bold" :class="getTextColor">{{ percentage }}%</div>
          <div class="text-sm text-gray-500">Gastado</div>
        </div>
      </div>
    </div>

    <div class="space-y-3 mt-2">
      <div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span class="text-gray-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Presupuesto:
        </span>
        <span class="font-medium text-gray-700">${{ budget.toFixed(2) }}</span>
      </div>
      
      <div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span class="text-gray-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          Gastado:
        </span>
        <span class="font-medium text-sky-700">${{ spent.toFixed(2) }}</span>
      </div>
      
      <div class="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
        <span class="text-gray-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Disponible:
        </span>
        <span :class="getAvailableClass">${{ (budget - spent).toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  spent: {
    type: Number,
    required: true,
    default: 0
  },
  budget: {
    type: Number,
    required: true,
    default: 0
  }
});

const circumference = computed(() => {
  return 2 * Math.PI * 45;
});

const percentage = computed(() => {
  if (props.budget <= 0) return 0;
  return Math.min(Math.round((props.spent / props.budget) * 100), 100);
});

const calculateOffset = computed(() => {
  if (props.budget <= 0) return circumference.value;
  const offset = circumference.value - (percentage.value / 100) * circumference.value;
  return offset;
});

const getProgressColor = computed(() => {
  if (percentage.value < 50) return '#10b981'; 
  if (percentage.value < 75) return '#f59e0b'; 
  return '#ef4444'; 
});

const getTextColor = computed(() => {
  if (percentage.value < 50) return 'text-green-600';
  if (percentage.value < 75) return 'text-amber-600';
  return 'text-red-600';
});

const getAvailableClass = computed(() => {
  const available = props.budget - props.spent;
  if (available <= 0) return 'font-medium text-red-600';
  if (available < props.budget * 0.25) return 'font-medium text-amber-600';
  return 'font-medium text-green-600';
});
</script>

<style scoped>
.pt-24 {
  padding-top: 2rem; 
}
</style>