<template>
  <div class="relative">
    <BudgetForm @add-expense="addExpense" @set-budget="setBudget" />
    <div class="p-2 md:p-2 transition-all duration-300 md:ml-64">
      <div class="flex justify-center mb-8">
        <BudgetChart :spent="totalSpent()" :budget="budget" />
      </div>
      <div 
        :class="{
          'w-full': budget > 0, 
          'w-full': budget <= 0   
        }" 
        class="p-4 md:p-8 flex flex-col items-center justify-center space-y-6"
      >
        <div class="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
          <h3 class="text-lg font-bold text-gray-700 mb-4">Lista de Gastos</h3>
          <BudgetList :expenses="expenses" :totalSpent="totalSpent()" :removeExpense="removeExpense" />
          
          <div class="mt-8 flex justify-center w-full">
            <button 
              @click="resetAll" 
              class="flex items-center bg-red-50 hover:bg-red-100 text-red-600 font-normal py-2 px-4 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Reiniciar Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBudget } from "@/composables/useBudget";
import BudgetForm from "@/components/BudgetForm.vue";
import BudgetList from "@/components/BudgetList.vue";
import BudgetChart from "@/components/BudgetChart.vue";

const { budget, expenses, addExpense, totalSpent, removeExpense, setBudget, resetAll } = useBudget();
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
  padding: 16px; 
}

h1 {
  font-size: 1.75rem;
  font-weight: 600;
}

input {
  border-radius: 1rem;
}

button {
  border-radius: 10rem;
}

.bg-white {
  padding: 16px; 
}

.max-w-xl {
  max-width: 36rem; 
  margin: 0 auto; 
}

.md\:ml-64 {
  margin-left: 16rem; 
}

.p-4 {
  padding: 16px; 
}

.md\:p-8 {
  padding: 32px; 
}

.w-full {
  width: 100%;
}

.max-w-lg {
  max-width: 32rem; 
}

.rounded-lg {
  border-radius: 1rem;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.space-y-6 {
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .md\:ml-64 {
    margin-left: 0;
  }
}
</style>
