import { Shield } from 'lucide-react';
import { LegalPage } from './LegalPage';
import { useSiteContent } from '../content/store';

export function PrivacyPolicy() {
  const { privacy } = useSiteContent().content;
  return <LegalPage icon={Shield} page={privacy} />;
}
