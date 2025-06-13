<script setup>
import { ref } from 'vue'

const id = ref('')
const vehiculo = ref(null)
const error = ref('')

const buscar = async () => {
  vehiculo.value = null
  error.value = ''
  try {
    const res = await fetch(`http://localhost:4000/api/vehiculos/${id.value}`)
    if (!res.ok) throw new Error('No encontrado')
    vehiculo.value = await res.json()
  } catch {
    error.value = 'Vehículo no encontrado'
  }
}
</script>

<template>
  <form class="buscar-form bg-white rounded-3xl shadow-lg p-12 max-w-xl mx-auto mt-12 grid grid-cols-2 gap-x-8 gap-y-6" @submit.prevent="buscar">
    <h2 class="titulo col-span-2 text-center text-2xl font-bold mb-2 flex items-center justify-center gap-2 text-[#232946]">
      <span class="icon text-xl">🔍</span> Buscar Vehículo por ID
    </h2>
    <div class="form-row col-span-2 flex flex-col gap-1">
      <label for="id" class="font-semibold text-[#232946] mb-0.5">ID del Vehículo</label>
      <input id="id" v-model="id" placeholder="ID" required class="input border-pink-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
    </div>
    <button type="submit"
      class="col-start-2 justify-self-end mt-4 px-8 py-3 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-600 to-pink-200 text-[#232946] shadow-md hover:from-blue-700 hover:to-pink-300 transition-all min-w-[150px] min-h-[48px]"
    >Buscar</button>
    <div v-if="vehiculo" class="resultado col-span-2 mt-4 text-center font-semibold rounded-lg shadow">
      <strong>Marca:</strong> {{ vehiculo.marca }}<br>
      <strong>Modelo:</strong> {{ vehiculo.modelo }}<br>
      <strong>Año:</strong> {{ vehiculo.anio }}<br>
      <strong>Color:</strong> {{ vehiculo.color }}<br>
      <strong>Tipo:</strong> {{ vehiculo.tipo }}<br>
      <strong>Precio:</strong> ${{ vehiculo.precio }}
    </div>
    <div v-if="error" class="error col-span-2 mt-4 text-center font-semibold rounded-lg shadow">{{ error }}</div>
  </form>
</template>

<style scoped>
.buscar-form {
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
.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  grid-column: 1 / -1;
}
.input {
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 1.5px solid #eebbc3;
  background: #f8f9fa;
  font-size: 1em;
  transition: border 0.2s, box-shadow 0.2s;
  color: #111;
}
.input:focus {
  border: 1.5px solid #2d7ff9;
  outline: none;
  box-shadow: 0 0 0 2px #b3d1fa55;
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
.resultado, .error {
  grid-column: 1 / -1;
}
.resultado {
  margin-top: 1.2em;
  background: #e6fbe9;
  padding: 1em;
  border-radius: 8px;
  color: #176b34;
  font-weight: 600;
  box-shadow: 0 1px 6px #0001;
}
.error {
  color: #c00;
  background: #ffeaea;
  border: 1.5px solid #f5bebe;
  margin-top: 1.2em;
  text-align: center;
  border-radius: 8px;
  padding: 0.8em 1em;
  font-weight: 600;
  box-shadow: 0 1px 6px #0001;
}
@media (max-width: 800px) {
  .buscar-form {
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
  .buscar-form {
    padding: 1.2em 0.5em;
    max-width: 98vw;
  }
  .titulo {
    font-size: 1.1em;
  }
}
</style>
