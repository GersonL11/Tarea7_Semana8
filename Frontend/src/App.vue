<script setup>
import { ref } from 'vue'
import AgregarVehiculo from './components/AgregarVehiculo.vue'
import ListarVehiculos from './components/ListarVehiculos.vue'
import BuscarVehiculo from './components/BuscarVehiculo.vue'
import ActualizarVehiculo from './components/ActualizarVehiculo.vue'
import EliminarVehiculo from './components/EliminarVehiculo.vue'
import EliminarVehiculosMasivo from './components/EliminarVehiculosMasivo.vue'
import AgregarVehiculosMasivo from './components/AgregarVehiculosMasivo.vue'

const menu = [
  { key: 'listar', label: 'Listar Vehículos', icon: '📋' },
  { key: 'agregar', label: 'Agregar Vehículo', icon: '➕' },
  { key: 'agregarMasivo', label: 'Agregar Masivo', icon: '🗂️' },
  { key: 'buscar', label: 'Buscar por ID', icon: '🔍' },
  { key: 'actualizar', label: 'Actualizar Vehículo', icon: '✏️' },
  { key: 'eliminar', label: 'Eliminar por ID', icon: '🗑️' },
  { key: 'eliminarMasivo', label: 'Eliminar Todos', icon: '🚫' }
]
const selected = ref('listar')
</script>

<template>
  <div class="admin-panel">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/vite.svg" alt="Logo" class="logo" />
        <h1>Admin Vehículos</h1>
      </div>
      <nav>
        <ul>
          <li v-for="item in menu" :key="item.key">
            <button
              :class="{ active: selected === item.key }"
              @click="selected = item.key"
            >
              <span class="menu-icon">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
    <section class="main-content">
      <transition name="fade" mode="out-in">
        <div :key="selected" class="panel-content">
          <ListarVehiculos v-if="selected === 'listar'" />
          <AgregarVehiculo v-else-if="selected === 'agregar'" />
          <AgregarVehiculosMasivo v-else-if="selected === 'agregarMasivo'" />
          <BuscarVehiculo v-else-if="selected === 'buscar'" />
          <ActualizarVehiculo v-else-if="selected === 'actualizar'" />
          <EliminarVehiculo v-else-if="selected === 'eliminar'" />
          <EliminarVehiculosMasivo v-else-if="selected === 'eliminarMasivo'" />
        </div>
      </transition>
    </section>
  </div>
</template>

<style scoped>
.admin-panel {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background: #f4f6fa;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.sidebar {
  width: 260px;
  background: #232946;
  color: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 2px 0 8px #0001;
}
.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 1em 1em 1em;
  border-bottom: 1px solid #eebbc3;
  background: #232946;
}
.logo {
  width: 48px;
  margin-bottom: 0.5em;
}
.sidebar h1 {
  font-size: 1.3em;
  margin: 0;
  text-align: center;
  letter-spacing: 1px;
  color: #eebbc3;
  font-weight: 700;
}
.sidebar nav ul {
  list-style: none;
  padding: 1.5em 0 0 0;
  margin: 0;
}
.sidebar nav li {
  margin-bottom: 0.5em;
}
.sidebar button {
  width: 100%;
  background: none;
  border: none;
  color: inherit;
  font-size: 1.05em;
  padding: 0.9em 1.2em;
  border-radius: 8px 0 0 8px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, font-weight 0.2s;
  display: flex;
  align-items: center;
  gap: 0.8em;
  font-weight: 500;
}
.menu-icon {
  font-size: 1.2em;
  width: 1.5em;
  display: inline-block;
  text-align: center;
}
.sidebar button.active,
.sidebar button:hover {
  background: #eebbc3;
  color: #232946;
  font-weight: bold;
}
.main-content {
  flex: 1;
  padding: 3em 2em;
  background: #f4f6fa;
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.panel-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  width: 100%;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (max-width: 900px) {
  .sidebar {
    width: 100px;
    padding: 0;
  }
  .sidebar-header {
    padding: 1em 0.2em 0.5em 0.2em;
  }
  .sidebar h1 {
    font-size: 0.9em;
    display: none;
  }
  .logo {
    width: 32px;
  }
  .sidebar button {
    font-size: 0.9em;
    padding: 0.7em 0.5em;
    gap: 0.2em;
  }
  .menu-icon {
    font-size: 1em;
    width: 1.2em;
  }
}
@media (max-width: 600px) {
  .admin-panel {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    border-bottom: 2px solid #eebbc3;
  }
  .sidebar nav ul {
    display: flex;
    flex-direction: row;
    padding: 0.5em 0;
    gap: 0.2em;
  }
  .sidebar nav li {
    margin-bottom: 0;
  }
  .main-content {
    padding: 1em 0.2em;
  }
}
</style>
