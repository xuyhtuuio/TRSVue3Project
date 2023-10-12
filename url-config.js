const config = {
  preDetatl: ''
}
if (import.meta.env.MODE === 'product') {
  config.preDetatl = 'http://192.168.210.57:31608/admin/manage/formManage';
} else {
  config.preDetatl = 'http://localhost:8082/admin/manage/formManage'
}

 export default config