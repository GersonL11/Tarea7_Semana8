<script setup>
import { ref } from 'vue'

const form = ref({
  marca: '',
  modelo: '',
  anio: '',
  color: '',
  tipo: '',
  precio: ''
})

const mensaje = ref('')
const cargando = ref(false)

const enviarFormulario = async () => {
  mensaje.value = ''
  cargando.value = true
  try {
    const respuesta = await fetch('http://localhost:4000/api/vehiculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (!respuesta.ok) {
      const error = await respuesta.json()
      throw new Error(error.error || 'Error al agregar vehículo')
    }
    mensaje.value = 'Vehículo agregado correctamente'
    form.value = {
      marca: '',
      modelo: '',
      anio: '',
      color: '',
      tipo: '',
      precio: ''
    }
  } catch (error) {
    mensaje.value = error.message
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <form 
    class="vehiculo-form bg-white rounded-3xl shadow-lg p-12 max-w-xl mx-auto mt-12 grid grid-cols-2 gap-x-8 gap-y-6 items-start"
    @submit.prevent="enviarFormulario"
  >
    <h2 class="titulo col-span-2 mb-2 text-[#232946] text-2xl font-bold text-center tracking-wide flex items-center justify-center gap-2">
      <span class="icon text-xl">➕</span> Agregar Vehículo
    </h2>
    <div class="form-row flex flex-col gap-1">
      <label for="marca" class="font-semibold text-[#232946] mb-0.5">Marca</label>
      <input id="marca" v-model="form.marca" placeholder="Marca" required 
        class="p-3 rounded-lg border-2 border-[#eebbc3] bg-[#f8f9fa] text-base transition focus:border-blue-500 focus:outline-none focus:shadow-md text-[#111]" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="modelo" class="font-semibold text-[#232946] mb-0.5">Modelo</label>
      <input id="modelo" v-model="form.modelo" placeholder="Modelo" required 
        class="p-3 rounded-lg border-2 border-[#eebbc3] bg-[#f8f9fa] text-base transition focus:border-blue-500 focus:outline-none focus:shadow-md text-[#111]" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="anio" class="font-semibold text-[#232946] mb-0.5">Año</label>
      <input id="anio" v-model="form.anio" placeholder="Año" required 
        class="p-3 rounded-lg border-2 border-[#eebbc3] bg-[#f8f9fa] text-base transition focus:border-blue-500 focus:outline-none focus:shadow-md text-[#111]" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="color" class="font-semibold text-[#232946] mb-0.5">Color</label>
      <input id="color" v-model="form.color" placeholder="Color" required 
        class="p-3 rounded-lg border-2 border-[#eebbc3] bg-[#f8f9fa] text-base transition focus:border-blue-500 focus:outline-none focus:shadow-md text-[#111]" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="tipo" class="font-semibold text-[#232946] mb-0.5">Tipo</label>
      <input id="tipo" v-model="form.tipo" placeholder="Tipo" required 
        class="p-3 rounded-lg border-2 border-[#eebbc3] bg-[#f8f9fa] text-base transition focus:border-blue-500 focus:outline-none focus:shadow-md text-[#111]" />
    </div>
    <div class="form-row flex flex-col gap-1">
      <label for="precio" class="font-semibold text-[#232946] mb-0.5">Precio</label>
      <input id="precio" v-model.number="form.precio" placeholder="Precio" type="number" required 
        class="p-3 rounded-lg border-2 border-[#eebbc3] bg-[#f8f9fa] text-base transition focus:border-blue-500 focus:outline-none focus:shadow-md text-[#111]" />
    </div>
    <button type="submit" :disabled="cargando"
      class="col-start-2 justify-self-end mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-200 text-[#232946] rounded-lg font-bold text-lg shadow-md flex items-center gap-2 transition disabled:bg-blue-200 disabled:text-gray-400 disabled:cursor-not-allowed"
    >
      <span v-if="cargando" class="loader"></span>
      <span v-else>Agregar</span>
    </button>
    <div v-if="mensaje" :class="['mensaje', mensaje.includes('correctamente') ? 'success' : 'error', 'col-span-2 mt-5 py-3 px-4 rounded-lg font-semibold text-center text-base shadow']">
      {{ mensaje }}
    </div>
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
.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}
label {
  font-weight: 600;
  color: #232946;
  margin-bottom: 0.1em;
}
input {
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 1.5px solid #eebbc3;
  background: #f8f9fa;
  font-size: 1em;
  transition: border 0.2s, box-shadow 0.2s;
  color: #111;
}
input:focus {
  border: 1.5px solid #2d7ff9;
  outline: none;
  box-shadow: 0 0 0 2px #b3d1fa55;
}
button {
  grid-column: 2 / 3;
  justify-self: end;
  margin-top: 1em;
  padding: 0.7em 2em;
  background: linear-gradient(90deg, #2d7ff9 60%, #eebbc3 100%);
  color: #232946;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1em;
  cursor: pointer;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
button:disabled {
  background: #b3d1fa;
  color: #888;
  cursor: not-allowed;
}
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2d7ff9;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
  display: inline-block;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
@media (max-width: 800px) {
  .vehiculo-form {
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
  .titulo {
    font-size: 1.1em;
  }
}
</style>
