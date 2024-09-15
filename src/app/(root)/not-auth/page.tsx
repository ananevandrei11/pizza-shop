import { InfoBlock } from '@/shared/components/shared';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock title="Access is denied" text="This page can only be viewed by authorized users" />
    </div>
  );
}
