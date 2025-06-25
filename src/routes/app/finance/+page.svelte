<script lang="ts">
  import Overlay from "$lib/components/Overlay.svelte";
  import type { FinanceItem } from "$lib/db/app";
  import { financeStore } from "$lib/stores";
  import type { FinanceData } from "$lib/types/coreday";
  import {
    Button,
    Card,
    ConnectedButtons,
    Dialog,
    Divider,
    Icon,
    ListItem,
    TextField,
  } from "m3-svelte";
  import { derived } from "svelte/store";
  import deleteIcon from "@ktibow/iconset-material-symbols/delete";
  import editIcon from "@ktibow/iconset-material-symbols/edit";
  import { setTitle } from "$lib/title.svelte";
  import { onMount } from "svelte";

  type FinanceForm = Omit<FinanceData, "amount"> & { amount: string };

  let newAmount = $state("");
  let newCategory = $state("");
  let newKind: FinanceData["kind"] = $state("income");
  let newNote = $state("");

  let open = $state(false);

  onMount(() => {
    setTitle("Finance");
  });

  function addEntry() {
    if (!newAmount || !newCategory) return;

    financeStore.add("finance", {
      kind: newKind,
      amount: parseInt(newAmount),
      category: newCategory,
      date: new Date().toISOString(),
      note: newNote || undefined,
    });

    newAmount = "";
    newCategory = "";
    newNote = "";

    open = false;
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString();
  }

  const totals = derived(financeStore, ($f) => {
    const income = $f
      .filter((e) => e.data.kind === "income")
      .reduce((a, b) => a + b.data.amount, 0);
    const expense = $f
      .filter((e) => e.data.kind === "expense")
      .reduce((a, b) => a + b.data.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  });

  function formatCurrency(n: number) {
    return n.toLocaleString("id-Id", { style: "currency", currency: "IDR" });
  }

  let editing: FinanceForm | null = $state(null);
  let editKind: FinanceData["kind"] = $state("income");
  let editId: string | null = $state(null);
  let dialogOpen = $state(false);

  function openEdit(item: FinanceItem) {
    editKind = item.data.kind;
    editing = {
      ...item.data,
      amount: item.data.amount.toString(),
    };
    editId = item.id;
    dialogOpen = true;
  }

  function saveEdit() {
    if (!editId || !editing) return;
    const parsedAmount = parseFloat(editing.amount as unknown as string);
    if (isNaN(parsedAmount)) return;

    financeStore.updateItem(editId, {
      data: {
        ...editing,
        amount: parsedAmount,
        kind: editKind,
      },
    });

    dialogOpen = false;
    editing = null;
    editId = null;
  }

  function deleteItem(id: string) {
    financeStore.remove(id);
  }
</script>

<div class="grid-container">
  <Card variant="filled">
    <div class="label">Income</div>
    <div class="value income">
      {formatCurrency($totals.income)}
    </div>
  </Card>
  <Card variant="filled">
    <div class="label">Expenses</div>
    <div class="value expense">
      {formatCurrency($totals.expense)}
    </div>
  </Card>
  <Card variant="filled">
    <div class="label">Balance</div>
    <div class="value balance">
      {formatCurrency($totals.balance)}
    </div>
  </Card>

  <Dialog headline="Add New Transaction" bind:open>
    {#snippet buttons()}
      <Button type="button" variant="tonal" click={addEntry}>Add</Button>
    {/snippet}
    <form class="form-container">
      <ConnectedButtons>
        <input
          type="radio"
          name="newKind"
          id="income"
          checked
          bind:group={newKind}
          value="income"
        />
        <Button for="income" variant="filled" square>Income</Button>
        <input
          type="radio"
          name="newKind"
          id="expense"
          bind:group={newKind}
          value="expense"
        />
        <Button for="expense" variant="filled" square>Expense</Button>
      </ConnectedButtons>

      <TextField
        name="Nominal"
        type="number"
        bind:value={newAmount}
        class="input full"
        required
      />

      <TextField
        name="Kategori"
        type="text"
        bind:value={newCategory}
        class="input full"
        required
      />

      <TextField
        name="Catatan (optional)"
        type="text"
        bind:value={newNote}
        class="input full"
      />
    </form>
  </Dialog>
  <Overlay visible={open} />
  <Button onclick={() => (open = true)}>Add Transaction</Button>
</div>

<Card variant="elevated" class="p-4 space-y-2">
  <h2 class="text-xl font-bold mb-2">Transaksi</h2>

  {#each $financeStore as item, i (item.id)}
    <ListItem
      overline={item.data.category}
      headline={`${formatDate(item.data.date)} — ${item.data.note ?? ""}`}
    >
      {#snippet trailing()}
        <div class="text-right text-sm font-semibold mb-1">
          <span
            class={item.data.kind === "income"
              ? "text-green-600"
              : "text-red-600"}
          >
            {item.data.kind === "income" ? "+" : "-"}{item.data.amount}
          </span>
        </div>
        <div class="flex gap-1">
          <Button iconType="full" onclick={() => openEdit(item)}
            ><Icon icon={editIcon} /></Button
          >
          <Button
            iconType="full"
            variant="elevated"
            onclick={() => deleteItem(item.id)}
            ><Icon icon={deleteIcon} /></Button
          >
        </div>
      {/snippet}
    </ListItem>

    {#if i < $financeStore.length - 1}
      <Divider />
    {/if}
  {/each}
</Card>

{#if editing}
  <Dialog headline="Edit Transaksi" bind:open={dialogOpen}>
    <form class="form-container">
      <ConnectedButtons>
        <input
          type="radio"
          name="editKind"
          id="editIncome"
          bind:group={editKind}
          value="income"
        />
        <Button for="editIncome" variant="filled" square>Income</Button>
        <input
          type="radio"
          name="editKind"
          id="editExpense"
          bind:group={editKind}
          value="expense"
        />
        <Button for="editExpense" variant="filled" square>Expense</Button>
      </ConnectedButtons>
      <TextField bind:value={editing.category} name="Kategori" />
      <TextField bind:value={editing.note} name="Catatan" />
      <TextField type="number" bind:value={editing.amount} name="Jumlah" />
      <TextField type="date" bind:value={editing.date} name="Tanggal" />
    </form>
    {#snippet buttons()}
      <Button onclick={() => (dialogOpen = false)}>Batal</Button>
      <Button onclick={saveEdit}>Simpan</Button>
    {/snippet}
  </Dialog>
  <Overlay visible={dialogOpen} />
{/if}

<style>
  .grid-container {
    display: grid;
    gap: 1rem;
  }

  .label {
    font-size: 0.875rem;
    color: #4b5563;
  }

  .value {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .income {
    color: #16a34a;
  }

  .expense {
    color: #dc2626;
  }

  .balance {
    color: #2563eb;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
