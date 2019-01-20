import inventoryRequests from './inventoryRequests';
import beanRequests from './beanRequests';

const getAllInventoryWithBeanInfo = (uid) => new Promise((resolve, reject) => {
  let items = [];
  let beanInventory = [];
  inventoryRequests.getAllInventory(uid)
    .then((inventory) => {
      items = inventory;
      beanRequests.getAllBeans()
        .then((beans) => {
          const newBeans = beans.map(bean => Object.assign({ ...items.find(x => x.beanId === bean.id), ...bean }));
          newBeans.forEach((bean) => {
            console.log('bean', bean);
            if ("uid" in bean ) {
              beanInventory.push(bean);
            }
          })
          console.log('new beans', newBeans);
          console.log('bean inventory', beanInventory);
          resolve(beanInventory);
        });
    })
    .catch(err => reject(err));
});

export default { getAllInventoryWithBeanInfo };
