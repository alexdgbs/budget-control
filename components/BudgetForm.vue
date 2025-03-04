<template>
  <div class="py-10">
    <header class="fixed top-0 left-0 w-full bg-white text-gray-700 py-3 px-4 shadow-lg z-50 flex items-center justify-between">
      <div class="flex items-center">
        <button 
          @click="toggleSidebar" 
          class="md:hidden bg-sky-600 hover:bg-sky-800 text-white p-2 transition-colors duration-200 mr-3"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="showSidebar" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 class="text-xl font-bold flex items-center">
          Budget Control
        </h1>
      </div>
    </header>
    <div 
      v-if="showSidebar" 
      class="md:hidden fixed inset-0 bg-gray-100 bg-opacity-30 z-30 backdrop-blur-sm transition-opacity duration-300"
      @click="toggleSidebar"
    ></div>
    <div 
      :class="[ 
        'transition-all duration-300 ease-in-out',
        'fixed left-0 top-0 mt-16 h-full bg-white shadow-xl z-40 p-6',
        showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'w-64 md:w-72'
      ]"
    >   
      <div class="mb-6">
        <h2 class="text-lg font-bold text-sky-700 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Gasto
        </h2>

        <label for="expenseName" class="block mb-2 font-medium text-gray-700 text-sm">Nombre del Gasto</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <input
            id="expenseName"
            v-model="expenseName"
            type="text"
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
            placeholder="Descripción del gasto"
          />
        </div>

        <label for="expenseAmount" class="block mt-4 mb-2 font-medium text-gray-700 text-sm">Monto del Gasto</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500">$</span>
          </div>
          <input
            id="expenseAmount"
            v-model.number="expenseAmount"
            type="number"
            min="0"
            step="0.01"
            class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
            placeholder="0.00"
          />
        </div>

        <label for="totalBudget" class="block mt-4 mb-2 font-medium text-gray-700 text-sm">Presupuesto Total</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500">$</span>
          </div>
          <input
            id="totalBudget"
            v-model.number="totalBudget"
            type="number"
            min="0"
            step="0.01"
            class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
            placeholder="Presupuesto Total"
            :disabled="!!savedBudget"
          />
        </div>

        <button
          @click="savedBudget ? resetBudget() : updateBudget()"
          :class="[ 
            'w-full mt-6 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center',
            (savedBudget || (totalBudget > 0)) 
              ? 'bg-sky-600 hover:bg-sky-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          ]"  
          :disabled="!savedBudget && totalBudget <= 0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!savedBudget" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
          </svg>
          {{ savedBudget ? 'Reiniciar Presupuesto' : 'Agregar Presupuesto' }}
        </button>

        <button
          @click="submitExpense"
          :class="[ 
            'w-full mt-6 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center',
            (expenseName && expenseAmount > 0 && savedBudget) 
              ? 'bg-sky-600 hover:bg-sky-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          ]"  
          :disabled="!expenseName || expenseAmount <= 0 || !savedBudget"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Agregar Gasto
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const expenseName = ref('');
const expenseAmount = ref('');
const totalBudget = ref('');
const savedBudget = ref(null);
const emit = defineEmits(['add-expense', 'set-budget']);
const showSidebar = ref(false);

onMounted(() => {
  const storedBudget = localStorage.getItem('totalBudget');
  if (storedBudget) {
    savedBudget.value = Number(storedBudget);
    emit('set-budget', savedBudget.value);
  }
});

const submitExpense = () => {
  if (expenseName.value && Number(expenseAmount.value) > 0 && savedBudget.value) {
    emit('add-expense', { 
      name: expenseName.value, 
      amount: Number(expenseAmount.value) 
    });
    expenseName.value = '';
    expenseAmount.value = '';
    
    if (window.innerWidth < 768) {
      showSidebar.value = false;
    }
  }
};

const updateBudget = () => {
  if (totalBudget.value > 0) {
    savedBudget.value = totalBudget.value;
    localStorage.setItem('totalBudget', totalBudget.value.toString());
    emit('set-budget', savedBudget.value);
    totalBudget.value = '';
  }
};

const resetBudget = () => {
  savedBudget.value = null;
  localStorage.removeItem('totalBudget');
  totalBudget.value = '';
  emit('set-budget', 0);
};

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar {
  top: 4rem;
}

.w-80 {
  width: 20rem;
}

.h-full {
  height: 100vh;
}

.bg-white {
  background-color: white;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-6 {
  padding: 16;
}

input {
  border-radius: 1rem;
}

button {
  border-radius: 5rem;
}
.pt-24 {
  padding-top: 6rem;
}
</style>
