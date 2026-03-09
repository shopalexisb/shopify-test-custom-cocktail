export const fetchSiteData = async (
  siteId: string
): Promise<any> => {
  try {
    if(siteId.length){
      return await fetch(`https://stagingapi2.shop.com/site/v1/Site/${siteId}?api_key=759ef1fc9e4c4e8bbf900db5f4b7caba`);
    }
  } catch (error) {
    console.error(`Error getting site info for siteId: ${siteId}`, error);
  }
};
