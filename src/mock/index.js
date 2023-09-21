
import Mock from 'mockjs';

const arr = [];
console.log('111');
for(let i =0; i < 10; i++) {
  arr.push({
    id: Mock.mock('@guid'),
    name: Mock.mock('@cname'),
    place: Mock.mock('@county(true)'),
  });
}

export default [
  {
    url:'/list',
    method: 'get',
    response: () => {
      console.log(arr);
      return arr;
    }
  },
  {
    url:'/del',
    method: 'delete',
    response: ({query}) => {
      const index = arr.findIndex((item) => item.id === query.id);
      arr.splice(index,1);
      return { sucess: true };
    }
  },
];
