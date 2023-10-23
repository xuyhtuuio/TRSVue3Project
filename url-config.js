const config = {
  preDetatl: ''
}
if (import.meta.env.MODE === 'product') {
  config.preDetatl = window.location.origin +'/manageweb';
} else {
  config.preDetatl = 'http://localhost:8082/#/admin/manage/formManage'
}

 export default config