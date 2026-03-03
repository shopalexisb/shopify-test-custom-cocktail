export const CustomerConfig = {
    pcid: getPcid()
}

function getPcid(){
  console.log("get pcid");
  const customerConfig = JSON.parse(
    document.getElementById('cc-customer-config').textContent
  );
  console.log("customer config: " + customerConfig);
  if(customerConfig){
    return customerConfig.pcid;
  } else {
    return "";
  }
}
