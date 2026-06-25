import { ServiceDetailPage } from "../_components/ServiceDetailPage";
import { generateServiceMetadata } from "../_components/ServicePageShell";
import { salesEnablementContent } from "../service-page-content";

export const dynamic = "force-static";

export const generateMetadata = () =>
  generateServiceMetadata(salesEnablementContent.slug);

export default function SalesEnablementPage() {
  return <ServiceDetailPage content={salesEnablementContent} />;
}
