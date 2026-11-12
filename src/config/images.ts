/**
 * Photography registry. Images listed here get an automatic blurred
 * placeholder (generated at build time) so they fade in from a soft preview
 * instead of an empty box.
 *
 * To swap a photo, replace the file in /public/images (same name), or add a
 * new import below and reference its path from the components/config.
 */
import type { StaticImageData } from "next/image";
import bedroom from "../../public/images/bedroom.jpg";
import cleanerDetail from "../../public/images/cleaner-detail.jpg";
import ecoProducts from "../../public/images/eco-products.jpg";
import heroHome from "../../public/images/hero-home.jpg";
import kitchenAfter from "../../public/images/kitchen-after.jpg";
import kitchenBefore from "../../public/images/kitchen-before.jpg";
import serviceDeep from "../../public/images/service-deep.jpg";
import serviceMoveIn from "../../public/images/service-movein.jpg";
import serviceRegular from "../../public/images/service-regular.jpg";
import serviceStandard from "../../public/images/service-standard.jpg";
import serviceTenancy from "../../public/images/service-tenancy.jpg";

export const PHOTOS: Record<string, StaticImageData> = {
  "/images/bedroom.jpg": bedroom,
  "/images/cleaner-detail.jpg": cleanerDetail,
  "/images/eco-products.jpg": ecoProducts,
  "/images/hero-home.jpg": heroHome,
  "/images/kitchen-after.jpg": kitchenAfter,
  "/images/kitchen-before.jpg": kitchenBefore,
  "/images/service-deep.jpg": serviceDeep,
  "/images/service-movein.jpg": serviceMoveIn,
  "/images/service-regular.jpg": serviceRegular,
  "/images/service-standard.jpg": serviceStandard,
  "/images/service-tenancy.jpg": serviceTenancy,
};
