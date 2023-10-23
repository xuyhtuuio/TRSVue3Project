const config = {
  preDetatl: ''
}
if (import.meta.env.MODE === 'product') {
  config.preDetatl = 'http://192.168.210.57:31705/manageweb';
} else {
  config.preDetatl = 'http://localhost:8082/admin/manage/formManage'
}

 export default config