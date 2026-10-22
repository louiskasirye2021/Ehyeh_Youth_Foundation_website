import { FileText } from 'lucide-react';
import { LegalPage } from './LegalPage';
import { useSiteContent } from '../content/store';

export function TermsConditions() {
  const { terms } = useSiteContent().content;
  return <LegalPage icon={FileText} page={terms} />;
}
