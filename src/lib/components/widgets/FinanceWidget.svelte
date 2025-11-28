<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { finance } from '../../../stores/appStores.js';
  import { Plus, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { Archive } from 'lucide-svelte';

  export let title;
  export let startDrag;

  let amount = '';
  let type = 'expense'; // 'income' | 'expense'

  function addTransaction() {
    if (!amount || isNaN(amount)) return;
    
    const val = parseFloat(amount);
    const newTransaction = {
      id: uuidv4(),
      type,
      amount: val,
      date: new Date().toISOString()
    };

    finance.update(store => {
      const newBalance = type === 'income' ? store.balance + val : store.balance - val;
      return {
        balance: newBalance,
        transactions: [newTransaction, ...store.transactions].slice(0, 10) // Keep last 10
      };
    });

    amount = '';
  }
</script>

<WidgetContainer {title} headerAction={Plus} {startDrag}>
  <div class="flex flex-col h-full">
    <div class="mb-4">
      <h4 class="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">Total Balance</h4>
      <p class="text-2xl md:text-4xl font-bold text-apple-dark tracking-tight">${$finance.balance.toFixed(2)}</p>
    </div>

    <!-- Quick Add -->
    <div class="flex gap-2 mb-4">
      <input 
        type="number" 
        bind:value={amount}
        placeholder="0.00" 
        class="w-full bg-white/50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
      <div class="flex bg-gray-100 p-1 rounded-lg">
        <button 
          class="p-1 rounded-md transition-colors {type === 'income' ? 'bg-white shadow-sm text-green-600' : 'text-gray-400'}"
          onclick={() => type = 'income'}
        >
          <Plus size={16} />
        </button>
        <button 
          class="p-1 rounded-md transition-colors {type === 'expense' ? 'bg-white shadow-sm text-red-600' : 'text-gray-400'}"
          onclick={() => type = 'expense'}
        >
          <Minus size={16} />
        </button>
      </div>
      <button 
        class="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        onclick={addTransaction}
      >
        Add
      </button>
    </div>

    <!-- Recent Transactions -->
    <div class="flex-1 overflow-y-auto no-scrollbar space-y-2">
      {#if $finance.transactions.length > 0}
        {#each $finance.transactions as t (t.id)}
          <div class="flex justify-between items-center p-2 rounded-lg bg-white/40 hover:bg-white/60 transition-colors">
            <div class="flex items-center gap-2">
              <div class="p-1 rounded-full {t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">
                {#if t.type === 'income'}
                  <ArrowUpRight size={14} />
                {:else}
                  <ArrowDownRight size={14} />
                {/if}
              </div>
              <span class="text-sm text-gray-700 capitalize">{t.type}</span>
            </div>
            <span class="text-sm font-semibold {t.type === 'income' ? 'text-green-600' : 'text-red-600'}">
              {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
            </span>
          </div>
        {/each}
      {:else}
        <div class="h-full flex flex-col items-center justify-center text-gray-400 gap-2 min-h-[100px]">
           <Archive size={24} class="opacity-50" />
           <p class="text-xs">No transactions yet</p>
        </div>
      {/if}
    </div>
  </div>
</WidgetContainer>
