
import gTableCard from '@/components/comTableCard.vue'
import FileType from '@/components/file-type.vue'
import ComDynamicForm from '@/components/com-dynamic-form.vue'
import ComAttachmentUpload from '@/components/com-attachment-upload.vue'
import filePreview from '@/components/filePreview.vue'
import gIcon from '@/components/trs-icon.vue'
const data = [gTableCard, FileType, ComDynamicForm, ComAttachmentUpload, gIcon, filePreview]

export default function (Vue) {
  data.forEach(cpt => {
    Vue.component(cpt.name, cpt)
  });
}
