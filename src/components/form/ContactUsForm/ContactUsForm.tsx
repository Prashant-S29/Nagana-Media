import { CalendlyFormEmbed } from "~/components/feature";
import { env } from "~/env";

export const ContactUsForm: React.FC = () => {
  return (
    <div>
      <CalendlyFormEmbed url={env.CALENDLY_FORM_URL} />
    </div>
  );
};
