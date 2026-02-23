export default function ItemDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-[#1A1615]">
        Item Details: {params.id}
      </h1>
      <div className="bg-white rounded-[24px] p-8 card-shadow border border-white/50">
        <p className="text-[#6B7280]">Detailed view for item {params.id}.</p>
      </div>
    </div>
  );
}
