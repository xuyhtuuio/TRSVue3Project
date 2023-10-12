<template>
  <div>
    <svg class="icon" :style="styleIcon" aria-hidden="true">
      <use :xlink:href="href"></use>
    </svg>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'gIcon',
  data() {
    return {
      styleIcon: {
        width: (this.stylePx || this.wProp) + 'px',
        height: (this.stylePx || this.hProp) + 'px',
      }
    }
  }
}
</script>
<script setup>
const props = defineProps({
  href: {
    typeof: String,
    required: true
  },
  stylePx: {
    typeof: Number,
    default: ''
  },
  wProp: {
    typeof: Number,
    default: '2em'
  },
  hProp: {
    typeof: Number,
    default: '2em'
  }
})
const styleIcon = reactive({
  width: (props.stylePx || props.wProp) + 'px',
  height: (props.stylePx || props.hProp) + 'px',
})
</script>
