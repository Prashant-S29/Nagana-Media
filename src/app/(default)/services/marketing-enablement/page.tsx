import { ServiceDetailPage } from "../_components/ServiceDetailPage";
import { generateServiceMetadata } from "../_components/ServicePageShell";
import { marketingEnablementContent } from "../service-page-content";

export const dynamic = "force-static";

export const generateMetadata = () =>
  generateServiceMetadata(marketingEnablementContent.slug);

export default function MarketingEnablementPage() {
  return <ServiceDetailPage content={marketingEnablementContent} />;
}
