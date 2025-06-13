<script setup>
import { ref, watch } from 'vue'

const id = ref('')
const form = ref({
  marca: '',
  modelo: '',
  anio: '',
  color: '',
  tipo: '',
  precio: ''
})
const mensaje = ref('')
const datosOriginales = ref({})

const cargarVehiculo = async () => {
  if (!id.value) return
  mensaje.value = ''
  try {
    const res = await fetch(`http://localhost:4000/api/vehiculos/${id.value}`)
    if (!res.ok) throw new Error('No encontrado')
    const data = await res.json()
    datosOriginales.value = { ...data }
    form.value = {
      marca: data.marca || '',
      modelo: data.modelo || '',
      anio: data.anio || '',
      color: data.color || '',
      tipo: data.tipo || '',
      precio: data.precio || ''
    }
  } catch {
    mensaje.value = 'Vehículo no encontrado'
    datosOriginales.value = {}
    form.value = {
      marca: '', modelo: '', anio: '', color: '', tipo: '', precio: ''
    }
  }
}

watch(id, (nuevo) => {
  if (nuevo && nuevo.length > 5) cargarVehiculo()
})

const actualizar = async () => {
  mensaje.value = ''
  const datosAEnviar = {
    marca: form.value.marca || datosOriginales.value.marca || '',
    modelo: form.value.modelo || datosOriginales.value.modelo || '',
    anio: form.value.anio || datosOriginales.value.anio || '',
    color: form.value.color || datosOriginales.value.color || '',
    tipo: form.value.tipo || datosOriginales.value.tipo || '',
    precio: form.value.precio || datosOriginales.value.precio || ''
  }
  try {
    const res = await fetch(`http://localhost:4000/api/vehiculos/${id.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosAEnviar)
    })
    if (!res.ok) throw new Error('Error al actualizar')
    mensaje.value = 'Vehículo actualizado'
  } catch {
    mensaje.value = 'Error al actualizar'
  }
}
</script>

<template>
  <form class="vehiculo-form bg-white rounded-3xl shadow-lg p-12 max-w-xl mx-auto mt-12 grid grid-cols-2 gap-x-8 gap-y-6" @submit.prevent="actualizar">
    <h2 class="titulo col-span-2 text-center text-2xl font-bold mb-2 flex items-center justify-center gap-2 text-[#232946]">
      <span class="icon text-xl">✏️</span> Actualizar Vehículo
    </h2>
    <div class="form-row col-span-2 flex flex-col gap-1" id="id-row">
      <label for="id" class="font-semibold text-[#232946] mb-0.5">ID del Vehículo</label>
      <input id="id" v-model="id" placeholder="ID" required class="input border-pink-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="marca" class="font-semibold text-[#232946] mb-0.5">Marca</label>
      <input id="marca" v-model="form.marca" :placeholder="datosOriginales.marca || 'Marca'" class="input" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="modelo" class="font-semibold text-[#232946] mb-0.5">Modelo</label>
      <input id="modelo" v-model="form.modelo" :placeholder="datosOriginales.modelo || 'Modelo'" class="input" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="anio" class="font-semibold text-[#232946] mb-0.5">Año</label>
      <input id="anio" v-model="form.anio" :placeholder="datosOriginales.anio || 'Año'" class="input" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="color" class="font-semibold text-[#232946] mb-0.5">Color</label>
      <input id="color" v-model="form.color" :placeholder="datosOriginales.color || 'Color'" class="input" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="tipo" class="font-semibold text-[#232946] mb-0.5">Tipo</label>
      <input id="tipo" v-model="form.tipo" :placeholder="datosOriginales.tipo || 'Tipo'" class="input" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="precio" class="font-semibold text-[#232946] mb-0.5">Precio</label>
      <input id="precio" v-model.number="form.precio" :placeholder="datosOriginales.precio || 'Precio'" type="number" class="input" />
    </div>
    <button type="submit"
      class="col-start-2 justify-self-end mt-4 px-8 py-3 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-500 to-pink-200 text-[#232946] shadow-md hover:from-blue-600 hover:to-pink-300 transition-all flex items-center gap-2"
    >Actualizar</button>
    <div v-if="mensaje" :class="['mensaje', mensaje.includes('actualizado') ? 'success' : 'error', 'col-span-2 mt-4 text-center font-semibold rounded-lg shadow']">{{ mensaje }}</div>
  </form>
</template>

<style scoped>
.vehiculo-form {
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
}
.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}
.form-row#id-row {
  grid-column: 1 / -1;
}
button, .actualizar-btn {
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
}
.mensaje {
  grid-column: 1 / -1;
}
.input {
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 1.5px solid #eebbc3;
  background: #f8f9fa;
  font-size: 1.15em;
  height: 2.8em;
  transition: border 0.2s, box-shadow 0.2s;
  color: #111;
}
.input:focus {
  border: 1.5px solid #2d7ff9;
  outline: none;
  box-shadow: 0 0 0 2px #b3d1fa55;
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
  margin-top: 1.2em;
  padding: 0.8em 1em;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  font-size: 1em;
  box-shadow: 0 1px 6px #0001;
}
button, button:disabled {
  background: linear-gradient(90deg, #2563eb 60%, #eebbc3 100%) !important;
  color: #232946 !important;
  font-weight: 700;
}
button:disabled {
  opacity: 0.85;
  filter: grayscale(0.2);
  cursor: not-allowed;
}
@media (max-width: 800px) {
  .vehiculo-form {
    grid-template-columns: 1fr;
    padding: 1.5em 0.5em;
    max-width: 98vw;
  }
}
</style>
