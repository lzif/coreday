<script>
  import WidgetContainer from '../WidgetContainer.svelte';
  import { finance } from '../../../stores/appStores.js';
  import { v4 as uuidv4 } from 'uuid';
  
  import { TextField, Button, Icon } from 'm3-svelte';
  
  import iconAdd from '@ktibow/iconset-material-symbols/add';
  import iconRemove from '@ktibow/iconset-material-symbols/remove';
  import iconArrowOutward from '@ktibow/iconset-material-symbols/arrow-outward';
  import iconCallReceived from '@ktibow/iconset-material-symbols/call-received';
  import iconArchive from '@ktibow/iconset-material-symbols/archive';

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
        transactions: [newTransaction, ...store.transactions].slice(0, 10)
      };
    });

    amount = '';
  }
</script>

<WidgetContainer {title} headerAction={iconAdd} {startDrag}>
  <div class="finance-widget">
    <div class="balance-section">
      <h4 class="m3-font-label-medium label">Total Balance</h4>
      <p class="m3-font-display-medium balance">${$finance.balance.toFixed(2)}</p>
    </div>

    <!-- Quick Add -->
    <div class="add-section">
      <div class="input-wrapper">
          <TextField 
            label="Amount" 
            bind:value={amount} 
            type="number"
          />
      </div>
      
      <div class="controls">
          <div class="type-toggle">
             <Button 
                variant={type === 'income' ? 'filled' : 'outlined'} 
                onclick={() => type = 'income'}
                iconType="full"
             >
                <Icon icon={iconAdd} />
             </Button>
             <Button 
                variant={type === 'expense' ? 'filled' : 'outlined'} 
                onclick={() => type = 'expense'}
                iconType="full"
             >
                 <Icon icon={iconRemove} />
             </Button>
          </div>
          
          <Button variant="tonal" onclick={addTransaction}>Add</Button>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="transactions-list">
      {#if $finance.transactions.length > 0}
        {#each $finance.transactions as t (t.id)}
          <div class="transaction-item">
            <div class="t-icon" style="background-color: rgb(var({t.type === 'income' ? '--m3-scheme-primary-container' : '--m3-scheme-error-container'}))">
               <Icon 
                 icon={t.type === 'income' ? iconArrowOutward : iconCallReceived} 
                 color="rgb(var({t.type === 'income' ? '--m3-scheme-on-primary-container' : '--m3-scheme-on-error-container'}))"
               />
            </div>
            <div class="t-details">
                <span class="m3-font-body-medium capitalize">{t.type}</span>
            </div>
            <span class="m3-font-label-large" style="color: rgb(var({t.type === 'income' ? '--m3-scheme-primary' : '--m3-scheme-error'}))">
              {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
            </span>
          </div>
        {/each}
      {:else}
        <div class="empty-state">
           <Icon icon={iconArchive} color="rgb(var(--m3-scheme-outline))" width="2rem" height="2rem" />
           <p class="m3-font-body-small" style="color: rgb(var(--m3-scheme-outline))">No transactions</p>
        </div>
      {/if}
    </div>
  </div>
</WidgetContainer>

<style>
  .finance-widget {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 1rem;
  }
  
  .balance-section {
      display: flex;
      flex-direction: column;
  }
  
  .label {
      color: rgb(var(--m3-scheme-on-surface-variant));
      text-transform: uppercase;
      letter-spacing: 1px;
  }
  
  .balance {
      color: rgb(var(--m3-scheme-on-surface));
      margin: 0;
  }
  
  .add-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  }
  
  .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  .type-toggle {
      display: flex;
      gap: 0.5rem;
  }
  
  .transactions-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
  }
  
  .transaction-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      border-radius: var(--m3-util-rounding-medium);
      background-color: rgb(var(--m3-scheme-surface-container-high));
  }
  
  .t-icon {
      padding: 0.25rem;
      border-radius: 50%;
      display: flex;
  }
  
  .t-details {
      flex: 1;
  }
  
  .empty-state {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
  }
  
  /* Helper to reset button in toggle if needed, but Button handles it */
  .input-wrapper {
      /* TextField needs some space maybe */
  }
</style>
