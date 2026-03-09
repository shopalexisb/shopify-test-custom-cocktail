export const MarketConfig = {
    siteId: getMarketInfo().siteId,
    country: getMarketInfo().country,
    language: getMarketInfo().language
}

function getMarketInfo(){
  return JSON.parse(
    document.getElementById('market-config').textContent
  );
}
