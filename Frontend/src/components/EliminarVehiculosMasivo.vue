<script setup>
import { ref } from 'vue'

const mensaje = ref('')

const eliminarTodos = async () => {
  mensaje.value = ''
  try {
    const res = await fetch('http://localhost:4000/api/vehiculos', {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error al eliminar todos')
    const data = await res.json()
    mensaje.value = `Eliminados: ${data.count}`
  } catch {
    mensaje.value = 'Error al eliminar todos'
  }
}
</script>

<template>
  <div class="eliminar-todos bg-white rounded-3xl shadow-lg p-12 max-w-xl mx-auto mt-12 grid grid-cols-2 gap-x-8 gap-y-6">
    <h2 class="titulo col-span-2 text-center text-2xl font-bold mb-2 flex items-center justify-center gap-2 text-[#232946]">
      <span class="icon text-xl">🚫</span> Eliminar Todos los Vehículos
    </h2>
    <button @click="eliminarTodos"
      class="col-span-2 mx-auto mt-4 px-8 py-3 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-600 to-pink-200 text-[#232946] shadow-md hover:from-blue-700 hover:to-pink-300 transition-all min-w-[150px] min-h-[48px]"
    >Eliminar Todos</button>
    <div v-if="mensaje" :class="['mensaje', mensaje.includes('Eliminados') ? 'success' : 'error', 'col-span-2 mt-4 text-center font-semibold rounded-lg shadow']">{{ mensaje }}</div>
  </div>
</template>

<style scoped>
.eliminar-todos {
  min-height: 60vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5em 2em;
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 8px 32px #0002;
  padding: 3em 3em 2.5em 3em;
  max-width: 700px;
  margin: 3em auto 0 auto;
  transition: box-shadow 0.2s;
  align-items: start;
}
.titulo {
  grid-column: 1 / -1;
  margin-bottom: 0.5em;
  color: #232946;
  font-size: 1.5em;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
}
.icon {
  font-size: 1.2em;
}
button,
button:disabled {
  background: linear-gradient(90deg, #2563eb 60%, #eebbc3 100%) !important;
  color: #232946 !important;
  font-weight: 700;
}
button:disabled {
  opacity: 0.85;
  filter: grayscale(0.2);
  cursor: not-allowed;
}
.success {
  color: #176b34;
  background: #e6fbe9;
  border: 1.5px solid #b6e2c6;
}
.error {
  color: #c00;
  background: #ffeaea;
  border: 1.5px solid #f5bebe;
}
.mensaje {
  grid-column: 1 / -1;
  margin-top: 1.2em;
  padding: 0.8em 1em;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  font-size: 1em;
  box-shadow: 0 1px 6px #0001;
}
input {
  color: #111;
}
@media (max-width: 800px) {
  .eliminar-todos {
    grid-template-columns: 1fr;
    padding: 1.5em 0.5em;
    max-width: 98vw;
  }
  button {
    grid-column: 1 / 2;
    justify-self: stretch;
  }
}
@media (max-width: 600px) {
  .eliminar-todos {
    padding: 1.2em 0.5em;
    max-width: 98vw;
  }
  .titulo {
    font-size: 1.1em;
  }
}
</style>
