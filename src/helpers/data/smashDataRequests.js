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
          const newBeans = beans.map(bean => Object.assign({ ...bean, ...items.find(x => x.beanId === bean.id), }));
          newBeans.forEach((bean) => {
            if ("uid" in bean ) {
              beanInventory.push(bean);
            }
          })
          resolve(beanInventory);
        });
    })
    .catch(err => reject(err));
});

const getRoastsWithBeanInfo =() => new Promise((resolve, reject) => {
  let beans = [];
  let roastsSmash = [];
    beanRequests.getAllBeans()
    .then((bns) => {
      beans = bns;
      roastRequests.getAllRoasts()
        .then((roasts) => {
          const roastBeans = roasts.map(roast => Object.assign({ ...beans.find(x => x.id === roast.beanId), ...roast }));
          roastBeans.forEach((roastBean) => {
            if ("roastName" in roastBean ) {
              roastsSmash.push(roastBean);
            }
          })
          resolve(roastsSmash);
        });
    })
    .catch(err => reject(err)); 
})

export default { getAllInventoryWithBeanInfo, getRoastsWithBeanInfo };
