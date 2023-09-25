
import gTableCard from '@/components/comTableCard.vue'
import FileType from '@/components/file-type.vue'
const data = [gTableCard, FileType]

export default function (Vue) {
  data.forEach(cpt => {
    Vue.component(cpt.name, cpt)
  });
}
