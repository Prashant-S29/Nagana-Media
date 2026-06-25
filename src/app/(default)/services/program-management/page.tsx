import { ServiceDetailPage } from "../_components/ServiceDetailPage";
import { generateServiceMetadata } from "../_components/ServicePageShell";
import { programManagementContent } from "../service-page-content";

export const dynamic = "force-static";

export const generateMetadata = () =>
  generateServiceMetadata(programManagementContent.slug);

export default function ProgramManagementPage() {
  return <ServiceDetailPage content={programManagementContent} />;
}
