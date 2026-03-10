export const CustomerConfig = {
    pcid: getPcid()
}

function getPcid(){
  const customerConfig = JSON.parse(
    document.getElementById('cc-customer-config').textContent
  );
  if(customerConfig){
    return customerConfig.pcid;
  } else {
    return "";
  }
}
