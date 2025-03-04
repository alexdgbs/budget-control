<template>
    <div v-if="expenses.length === 0" class="flex flex-col items-center justify-center py-8 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <p>No hay gastos registrados</p>
      <p class="text-sm mt-1">Agrega tu primer gasto para comenzar</p>
    </div>
    
    <ul v-else class="space-y-3 mb-6">
      <li
        v-for="(item, index) in expenses"
        :key="index"
        class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
      >
        <div class="flex items-center">
          <div class="p-2 mr-3 bg-sky-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-gray-800 font-medium">{{ item.name }}</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold text-gray-800 mr-4">${{ item.amount.toFixed(2) }}</span>
          <button 
            @click="removeExpense(index)" 
            class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Eliminar gasto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </li>
    </ul>
    
    <div class="bg-gray-100 p-4 rounded-lg">
      <div class="flex justify-between items-center">
        <span class="text-gray-700 font-medium">Total:</span>
        <span class="text-md text-sky-700 font-semibold">${{ totalSpent.toFixed(2) }}</span>
      </div>
    </div>
</template>

<script setup>
defineProps({
  expenses: {
    type: Array,
    default: () => []
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  removeExpense: {
    type: Function,
    required: true
  }
});
</script>