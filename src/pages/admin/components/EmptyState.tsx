interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
}

export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 text-center py-20 text-gray-400">
      <Icon className="w-12 h-12 mx-auto mb-3 opacity-30" />
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  );
}
