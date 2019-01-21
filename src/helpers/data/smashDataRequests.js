import inventoryRequests from './inventoryRequests';
import roastRequests from './roastRequests';
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
          resolve(beanInventory);
        });
    })
    .catch(err => reject(err));
});

const getRoastsWithBeanInfo =(uid) => new Promise((resolve, reject) => {
  let roasts = [];
  let roastsSmash = [];
  roastRequests.getAllRoasts(uid)
    .then((rsts) => {
      roasts = rsts;
      beanRequests.getAllBeans()
        .then((beans) => {
          const roastBeans = beans.map(bean => Object.assign({ ...roasts.find(x => x.beanId === bean.id), ...bean }));
          roastBeans.forEach((roastBean) => {
            if ("roastName" in roastBean ) {
              roastsSmash.push(roastBean);
            }
          })
          console.log(roastsSmash);
          resolve(roastsSmash);
        });
    })
    .catch(err => reject(err)); 
})

export default { getAllInventoryWithBeanInfo, getRoastsWithBeanInfo };
