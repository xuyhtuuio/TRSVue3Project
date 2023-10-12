
import gTableCard from '@/components/comTableCard.vue'
import FileType from '@/components/file-type.vue'
import gIcon from '@/components/trs-icon.vue'
const data = [gTableCard, FileType, gIcon]

export default function (Vue) {
  data.forEach(cpt => {
    Vue.component(cpt.name, cpt)
  });
}
