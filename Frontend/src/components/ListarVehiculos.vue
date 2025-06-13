<script setup>
import { ref, onMounted } from 'vue'

const vehiculos = ref([])
const error = ref('')

const cargarVehiculos = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/vehiculos')
    vehiculos.value = await res.json()
  } catch (e) {
    error.value = 'Error al cargar vehículos'
  }
}

onMounted(cargarVehiculos)
</script>

<template>
  <div class="listar-vehiculos w-full max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 md:p-10 transition-shadow border border-gray-200">
    <h2 class="titulo text-[#232946] mb-8 text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-2">
      <span class="text-xl">🚗</span> Vehículos Registrados
    </h2>
    <div v-if="error" class="flex items-center justify-center gap-2 bg-red-600 text-white rounded-md p-4 mb-4 font-semibold text-center">
      <span class="text-xl">⚠️</span> {{ error }}
    </div>
    <div v-else>
      <div v-if="vehiculos.length === 0" class="flex items-center justify-center gap-2 text-[#232946] bg-gray-100 rounded-md p-8 text-lg mb-4">
        <span class="text-xl">ℹ️</span> No hay vehículos registrados.
      </div>
      <div v-else class="overflow-x-auto rounded-lg shadow-inner max-h-[60vh] border border-gray-100">
        <table class="vehiculos-table w-full bg-white rounded-lg overflow-hidden text-sm md:text-base">
          <thead>
            <tr>
              <th class="th">#</th>
              <th class="th">Marca</th>
              <th class="th">Modelo</th>
              <th class="th">Año</th>
              <th class="th">Color</th>
              <th class="th">Tipo</th>
              <th class="th">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, i) in vehiculos" :key="v._id" class="even:bg-gray-50 hover:bg-pink-50 transition border-b border-gray-100 last:border-b-0">
              <td class="td">{{ i + 1 }}</td>
              <td class="td capitalize">{{ v.marca }}</td>
              <td class="td capitalize">{{ v.modelo }}</td>
              <td class="td">{{ v.anio }}</td>
              <td class="td capitalize">{{ v.color }}</td>
              <td class="td capitalize">{{ v.tipo }}</td>
              <td class="td font-bold">${{ v.precio.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listar-vehiculos {
  /* ...existing code... */
}
.titulo {
  /* ...existing code... */
}
.vehiculos-table th.th {
  background: linear-gradient(90deg, #eebbc3 60%, #ffe4ed 100%);
  color: #232946;
  font-weight: 800;
  padding: 0.75em 1em;
  font-size: 1.1em;
  letter-spacing: 0.5px;
}
.vehiculos-table td.td {
  color: #232946;
  padding: 0.75em 1em;
  font-size: 1em;
  border-bottom: 1px solid #f3e8ee;
}
.vehiculos-table tr:last-child td {
  border-bottom: none;
}
</style>
