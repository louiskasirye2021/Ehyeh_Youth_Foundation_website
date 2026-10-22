import { Users, GraduationCap, Sparkles } from 'lucide-react';

const DEFAULT_ICONS = [Users, GraduationCap, Sparkles];

/** The program's emoji if one is set, otherwise a matching default icon. */
export function ProgramIcon({ icon, index, size }: { icon?: string; index: number; size: number }) {
  if (icon && icon.trim()) {
    return (
      <span aria-hidden="true" style={{ fontSize: size * 1.05, lineHeight: 1 }}>
        {icon}
      </span>
    );
  }
  const Fallback = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
  return <Fallback size={size} className="text-white" />;
}
