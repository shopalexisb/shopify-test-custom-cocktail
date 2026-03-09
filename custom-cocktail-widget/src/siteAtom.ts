import { atom } from "jotai";
import { atomFamily } from "jotai-family";
import { fetchSiteData } from "./api/SiteAPI";
import { Site } from "./Site";

export const siteApiData = atomFamily((siteId: string) =>
  atom<Promise<Site>>(async () => {
    try {
      const data: Site = await fetchSiteData(siteId);
      return data;
    } catch (error) {
      console.error("Failed to fetch site info:", error);
      throw new Error("Error fetching data");
    }
  })
);
