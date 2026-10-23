import {
  Users,
  GraduationCap,
  Home,
  Target,
  HeartHandshake,
  Handshake,
  BookOpen,
  Sparkles,
  Award,
  Globe,
  Briefcase,
  Heart,
  Star,
  Calendar,
  Lightbulb,
  Scissors,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

/** Icons the admin panel can choose from for stats and key points. */
export const ICONS: Record<string, { label: string; Icon: LucideIcon }> = {
  people: { label: 'People', Icon: Users },
  graduation: { label: 'Graduation cap', Icon: GraduationCap },
  community: { label: 'Community (house)', Icon: Home },
  target: { label: 'Target', Icon: Target },
  care: { label: 'Caring hands', Icon: HeartHandshake },
  partnership: { label: 'Handshake', Icon: Handshake },
  book: { label: 'Book', Icon: BookOpen },
  sparkles: { label: 'Sparkles', Icon: Sparkles },
  award: { label: 'Award', Icon: Award },
  globe: { label: 'Globe', Icon: Globe },
  work: { label: 'Briefcase', Icon: Briefcase },
  heart: { label: 'Heart', Icon: Heart },
  star: { label: 'Star', Icon: Star },
  calendar: { label: 'Calendar', Icon: Calendar },
  idea: { label: 'Light bulb', Icon: Lightbulb },
  skills: { label: 'Scissors (skills)', Icon: Scissors },
  growth: { label: 'Growth', Icon: TrendingUp },
};

export function iconFor(name: string | undefined): LucideIcon {
  return (name && ICONS[name]?.Icon) || Star;
}
